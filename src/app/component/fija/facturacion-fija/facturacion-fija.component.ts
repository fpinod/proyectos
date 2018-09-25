import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CarroService } from '../../../service/carro/carro.service';
import { Cuentafija } from '../../../model/fija/cuentafija';
import { DialogDetalleFacturaFijaComponent } from '../dialog-detalle-factura-fija/dialog-detalle-factura-fija.component';
import { FacturacionFijaService } from '../../../service/fija/facturacion-fija.service';

@Component({
  selector: 'app-facturacion-fija',
  templateUrl: './facturacion-fija.component.html',
  styleUrls: ['./facturacion-fija.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({display: 'none'})),
      state('expanded', style({height: '*', display: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FacturacionFijaComponent implements OnInit {

  cuentas = Array<Cuentafija>();
  columnsToDisplay: string[] = ['select', 'cuenta', 'deuda_vencida', 'total', 'accion', 'detalle'];
  columnsDetailToDisplay: string[] = ['select_detail', 'mes', 'factura', 'f_emitida', 'f_vencida', 'valor', 'deuda', 'descarga', 'accion'];
  expandedElement: Cuentafija;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _facturacionFijaService: FacturacionFijaService,
    private _carroService: CarroService,
    public dialog: MatDialog) {
}

ngOnInit() {
  if ( !this._facturacionFijaService.cuentas ) {
    this._facturacionFijaService.getCuentas().subscribe(data => {
      this._facturacionFijaService.dataSource = new MatTableDataSource<Cuentafija>(data as Cuentafija[]);
      // console.log(this.dataSource);
      this._facturacionFijaService.dataSource.paginator = this.paginator;
      this._facturacionFijaService.dataSource.sort = this.sort;
    });
  } else {
    this._facturacionFijaService.dataSource.paginator = this.paginator;
    this._facturacionFijaService.dataSource.sort = this.sort;
  }
}

openDialogDetalleFactura(documento): void {
  const dialogRef = this.dialog.open(DialogDetalleFacturaFijaComponent, {
    data: documento,
    id: 'dialogDetalleFactura'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

applyFilter(filterValue: string) {
  this._facturacionFijaService.dataSource.filter = filterValue.trim().toLowerCase();
}

 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this._carroService.selection_fija.selected.length;
  const numRows = this._facturacionFijaService.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this._carroService.selection_fija_documento.clear();
  if ( this.isAllSelected() ) {
    this._carroService.selection_fija.clear();
  } else {
    for ( let i = 0; i < this._facturacionFijaService.dataSource.data.length; i++) {
      this._carroService.selection_fija.select(this._facturacionFijaService.dataSource.data[i]);
      this.seleccionarDocumentos(this._facturacionFijaService.dataSource.data[i]);
    }
  }
}

  /** Selecciona o todos los documentos de una cuenta */
  seleccionarDocumentos(row) {
    if ( !this._carroService.selection_fija.isSelected(row) ) {
      for (let index = 0; index < row.documentos.length; index++) {
        this._carroService.selection_fija_documento.select(row.documentos[index]);
      }
    } else {
      for (let index = 0; index < row.documentos.length; index++) {
        this._carroService.selection_fija_documento.toggle(row.documentos[index]);
      }
    }
  }

  seleccionarDocumentosVencidos() {
    this._carroService.selection_fija.clear();
    this._carroService.selection_fija_documento.clear();
    for (let index = 0; index < this._facturacionFijaService.dataSource.data.length; index++) {
      for (let index2 = 0; index2 < this._facturacionFijaService.dataSource.data[index].documentos.length; index2++) {
        const element = this._facturacionFijaService.dataSource.data[index].documentos[index2];
        if ( element.situacion === 'Vencida' ) {
          this._carroService.selection_fija_documento.select(element);
        }
      }
      if ( this.isAllDocumentSelected(this._facturacionFijaService.dataSource.data[index]) ) {
        this._carroService.selection_fija.select(this._facturacionFijaService.dataSource.data[index]);
      }
    }
  }

  seleccionarDocumentosPorVencer() {
    this._carroService.selection_fija.clear();
    this._carroService.selection_fija_documento.clear();
    for (let index = 0; index < this._facturacionFijaService.dataSource.data.length; index++) {
      for (let index2 = 0; index2 < this._facturacionFijaService.dataSource.data[index].documentos.length; index2++) {
        const element = this._facturacionFijaService.dataSource.data[index].documentos[index2];
        if ( element.situacion === 'Por vencer' ) {
          this._carroService.selection_fija_documento.select(element);
        }
      }
      if ( this.isAllDocumentSelected(this._facturacionFijaService.dataSource.data[index]) ) {
        this._carroService.selection_fija.select(this._facturacionFijaService.dataSource.data[index]);
      }
    }
  }

  isAllDocumentSelected(row) {
    let todo = true;
    for ( let index = 0; index < row.documentos.length; index++ ) {
      todo = false;
      for ( let index2 = 0; index2 < this._carroService.selection_fija_documento.selected.length; index2++ ) {
        if ( this._carroService.selection_fija_documento.selected[index2] === row.documentos[index] ) {
          // console.log('asd ' + this._carroService.selection_movil_documento.isSelected(
            // this._carroService.selection_movil_documento.selected[index2]));
          if ( this._carroService.selection_fija_documento.isSelected(this._carroService.selection_fija_documento.selected[index2]) ) {
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
    if ( !this._carroService.selection_fija_documento.isSelected(documento) ) {
      checkeado = true;
      for (let index = 0; index < cuenta.documentos.length; index++) {
        const element = cuenta.documentos[index];
        if ( element !== documento && checkeado === true ) {
          checkeado = this._carroService.selection_fija_documento.isSelected(element);
        }
      }
    }
    if ( checkeado ) {
      this._carroService.selection_fija.select(cuenta);
    } else {
      this._carroService.selection_fija.deselect(cuenta);
    }
  }


}
