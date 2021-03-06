import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturacionService } from '../../../service/movil/facturacion.service';
import { Cuenta } from '../../../model/movil/cuenta';

import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { DialogDocumentosComponent } from '../dialog-documentos/dialog-documentos.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DialogDetalleFacturaComponent } from '../dialog-detalle-factura/dialog-detalle-factura.component';
import { CarroService } from '../../../service/carro/carro.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({display: 'none'})),
      state('expanded', style({height: '*', display: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FacturacionComponent implements OnInit {

  cuentas = Array<Cuenta>();
  columnsToDisplay: string[] = ['select', 'cuenta', 'deuda_vencida', 'total', 'accion', 'detalle'];
  columnsDetailToDisplay: string[] = ['select_detail', 'mes', 'factura', 'f_emitida', 'f_vencida', 'valor', 'deuda', 'descarga', 'accion'];
  expandedElement: Cuenta;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _facturacionService: FacturacionService,
              private _carroService: CarroService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    if ( !this._facturacionService.cuentas ) {
      this._facturacionService.getCuentas().subscribe(data => {
        this._facturacionService.dataSource = new MatTableDataSource<Cuenta>(data as Cuenta[]);
        // console.log(this.dataSource);
        this._facturacionService.dataSource.paginator = this.paginator;
        this._facturacionService.dataSource.sort = this.sort;
      });
    } else {
      this._facturacionService.dataSource.paginator = this.paginator;
      this._facturacionService.dataSource.sort = this.sort;
    }

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
      data: cuenta,
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogDetalleFactura(documento): void {
    const dialogRef = this.dialog.open(DialogDetalleFacturaComponent, {
      data: documento,
      id: 'dialogDetalleFactura'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    this._facturacionService.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this._carroService.selection_movil.selected.length;
    const numRows = this._facturacionService.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this._carroService.selection_movil_documento.clear();
    if ( this.isAllSelected() ) {
      this._carroService.selection_movil.clear();
    } else {
      for ( let i = 0; i < this._facturacionService.dataSource.data.length; i++) {
        this._carroService.selection_movil.select(this._facturacionService.dataSource.data[i]);
        this.seleccionarDocumentos(this._facturacionService.dataSource.data[i]);
      }
    }
  }

  /** Selecciona o todos los documentos de una cuenta */
  seleccionarDocumentos(row) {
    if ( !this._carroService.selection_movil.isSelected(row) ) {
      for (let index = 0; index < row.documentos.length; index++) {
        this._carroService.selection_movil_documento.select(row.documentos[index]);
      }
    } else {
      for (let index = 0; index < row.documentos.length; index++) {
        this._carroService.selection_movil_documento.toggle(row.documentos[index]);
      }
    }
  }

  seleccionarDocumentosVencidos() {
    this._carroService.selection_movil.clear();
    this._carroService.selection_movil_documento.clear();
    for (let index = 0; index < this._facturacionService.dataSource.data.length; index++) {
      for (let index2 = 0; index2 < this._facturacionService.dataSource.data[index].documentos.length; index2++) {
        const element = this._facturacionService.dataSource.data[index].documentos[index2];
        if ( element.situacion === 'Vencida' ) {
          this._carroService.selection_movil_documento.select(element);
        }
      }
      if ( this.isAllDocumentSelected(this._facturacionService.dataSource.data[index]) ) {
        this._carroService.selection_movil.select(this._facturacionService.dataSource.data[index]);
      }
    }
  }

  seleccionarDocumentosPorVencer() {
    this._carroService.selection_movil.clear();
    this._carroService.selection_movil_documento.clear();
    for (let index = 0; index < this._facturacionService.dataSource.data.length; index++) {
      for (let index2 = 0; index2 < this._facturacionService.dataSource.data[index].documentos.length; index2++) {
        const element = this._facturacionService.dataSource.data[index].documentos[index2];
        if ( element.situacion === 'Por vencer' ) {
          this._carroService.selection_movil_documento.select(element);
        }
      }
      if ( this.isAllDocumentSelected(this._facturacionService.dataSource.data[index]) ) {
        this._carroService.selection_movil.select(this._facturacionService.dataSource.data[index]);
      }
    }
  }

  isAllDocumentSelected(row) {
    let todo = true;
    for ( let index = 0; index < row.documentos.length; index++ ) {
      todo = false;
      for ( let index2 = 0; index2 < this._carroService.selection_movil_documento.selected.length; index2++ ) {
        if ( this._carroService.selection_movil_documento.selected[index2] === row.documentos[index] ) {
          // console.log('asd ' + this._carroService.selection_movil_documento.isSelected(
            // this._carroService.selection_movil_documento.selected[index2]));
          if ( this._carroService.selection_movil_documento.isSelected(this._carroService.selection_movil_documento.selected[index2]) ) {
            todo = true;
          }
        }
      }
      if ( !todo ) {
        return false;
      }
    }
    return true;
  }

  /** cuando se seleccionan todos los documentos de una cuenta, se agrega seleccòn de la cuenta  */
  checkCuenta(documento, cuenta) {
    let checkeado = false;
    if ( !this._carroService.selection_movil_documento.isSelected(documento) ) {
      checkeado = true;
      for (let index = 0; index < cuenta.documentos.length; index++) {
        const element = cuenta.documentos[index];
        if ( element !== documento && checkeado === true ) {
          checkeado = this._carroService.selection_movil_documento.isSelected(element);
        }
      }
    }
    if ( checkeado ) {
      this._carroService.selection_movil.select(cuenta);
    } else {
      this._carroService.selection_movil.deselect(cuenta);
    }
  }

}
