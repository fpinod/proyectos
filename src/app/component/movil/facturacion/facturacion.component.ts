import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturacionService } from '../../../service/movil/facturacion.service';
import { Cuenta } from '../../../model/movil/cuenta';

import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { DialogDocumentosComponent } from '../dialog-documentos/dialog-documentos.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Documento } from '../../../model/movil/documento';

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
      console.log(data);
      this.cuentas = data as Cuenta[];
      this.dataSource = new MatTableDataSource<Cuenta>(this.cuentas);
      console.log(this.dataSource);

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
    console.log('this.isAllSelected() ' + this.isAllSelected() );
    if ( this.isAllSelected() ) {
      this.selection.clear();
      this.selection_detail.clear();
    }    else {
      for ( let i = 0; i < this.dataSource.data.length; i++) {
        this.selection.select(this.dataSource.data[i]);
        this.selection_detail.clear();
     }
    }
  }
}
