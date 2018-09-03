import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturacionService } from '../../../service/movil/facturacion.service';
import { Cuenta } from '../../../model/movil/cuenta';

import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { DialogDocumentosComponent } from '../dialog-documentos/dialog-documentos.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Documento } from '../../../model/movil/documento';
import { DialogDetalleFacturaComponent } from '../dialog-detalle-factura/dialog-detalle-factura.component';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FacturacionComponent implements OnInit {

  cuentas = Array<Cuenta>();
  dataSource;
  columnsToDisplay: string[] = ['select', 'cuenta', 'deuda_vencida', 'total', 'accion', 'detalle'];
  columnsDetailToDisplay: string[] = ['select_detail', 'mes', 'factura', 'fecha_emitida', 'fecha_vencida', 'valor', 'deuda', 'descarga'];
  expandedElement: Cuenta;
  selection = new SelectionModel<Cuenta>(true, []);
  selection_detail = new SelectionModel<Documento>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _facturacionService: FacturacionService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this._facturacionService.getCuentas().subscribe(data => {
      this.dataSource = new MatTableDataSource<Cuenta>(data as Cuenta[]);
      // console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogPagar(cuenta): void {
    const dialogRef = this.dialog.open(DialogPagarComponent, {
      data: cuenta
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogDocumentos(cuenta): void {
    const dialogRef = this.dialog.open(DialogDocumentosComponent, {
      data: cuenta
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogDetalleFactura(documento): void {
    const dialogRef = this.dialog.open(DialogDetalleFacturaComponent, {
      data: documento
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if ( this.isAllSelected() ) {
      this.selection.clear();
      this.selection_detail.clear();
    }    else {
      this.selection_detail.clear();
      for ( let i = 0; i < this.dataSource.data.length; i++) {
        this.selection.select(this.dataSource.data[i]);
     }
    }
  }

  seleccionarDocumentos(row) {
    if ( !this.selection.isSelected(row) ) {
      for (let index = 0; index < row.documentos.length; index++) {
        this.selection_detail.select(row.documentos[index]);
      }
    } else {
      for (let index = 0; index < row.documentos.length; index++) {
        this.selection_detail.toggle(row.documentos[index]);
      }
    }
    // for (let index = 0; index < row.documentos.length; index++) {
    //   const element = row.documentos[index];
    //   for ( let i = 0; i < this.selection_detail.selected.length; i++) {
    //     if (element.factura === this.selection_detail.selected[i].factura) {
    //       this.selection_detail.toggle(this.selection_detail.selected[i]);
    //     }
    //  }
    // }
  }

  borrarSeleccionadoCuenta(cuenta) {
    for ( let i = 0; i < this.selection.selected.length; i++) {
      if (this.selection.selected[i].cuenta === cuenta.cuenta) {
        this.selection.toggle(this.selection.selected[i]);
      }
    }
  }

  seleccionarDocumentosVencidos() {
    this.selection.clear();
    this.selection_detail.clear();

    for (let index = 0; index < this.dataSource.data.length; index++) {
      for (let index2 = 0; index2 < this.dataSource.data[index].documentos.length; index2++) {
        const element = this.dataSource.data[index].documentos[index2];
        if ( element.situacion === 'Vencida' ) {
          this.selection_detail.select(element);
        }
      }
    }
  }

  seleccionarDocumentosPorVencer() {
    this.selection.clear();
    this.selection_detail.clear();
    for (let index = 0; index < this.dataSource.data.length; index++) {
      for (let index2 = 0; index2 < this.dataSource.data[index].documentos.length; index2++) {
        const element = this.dataSource.data[index].documentos[index2];
        if ( element.situacion === 'Por vencer' ) {
          this.selection_detail.select(element);
        }
      }
    }
  }

}
