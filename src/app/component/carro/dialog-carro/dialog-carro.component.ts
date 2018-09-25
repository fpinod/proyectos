import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatSort, MatTableDataSource } from '@angular/material';
import { CarroService } from '../../../service/carro/carro.service';

@Component({
  selector: 'app-dialog-carro',
  templateUrl: './dialog-carro.component.html',
  styleUrls: ['./dialog-carro.component.css']
})
export class DialogCarroComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCarroComponent>,
    private _carroService: CarroService
  ) {}

  displayedColumnsFacturas: string[] = ['tipo', 'cuenta', 'factura', 'monto', 'eliminar'];
  dataSourceFacturas = new MatTableDataSource(this._carroService.getFacturas());

  displayedColumnsCuentas: string[] = ['tipo', 'cuenta', 'cant_factura', 'monto', 'eliminar'];
  dataSourceCuentas = new MatTableDataSource(this._carroService.getCuentas());

  @ViewChild(MatSort)  sortFacturas: MatSort;
  @ViewChild(MatSort)  sortCuentas: MatSort;

  ngOnInit() {
    this.dataSourceFacturas.sort = this.sortFacturas;
    this.dataSourceCuentas.sort = this.sortCuentas;
  }

  borrarDocumento(documento) {
    this._carroService.borrarDocumento(documento.factura);

    console.log('asdas' + documento.factura);
    console.log(this._carroService.selection_movil_documento.selected.length);

    // for (let index = 0; index < this._carroService.listaFacturas.length; index++    ) {
    //   const element = this._carroService.listaFacturas[index];
    //   if (documento.factura === element.factura) {
    //     console.log('bbbbbbbbbbb' + documento.factura);
    //     this._carroService.listaFacturas.splice(index, 1);
    //   }
    // }
    // console.log(this._carroService.listaFacturas.length);
    this.dataSourceFacturas = new MatTableDataSource(this._carroService.listaFacturas);
  }

  borrarCuenta(cuenta) {
    this._carroService.borrarCuenta(cuenta.cuenta);

    console.log('asdas' + cuenta.cuenta);
    console.log(this._carroService.selection_movil_documento.selected.length);

    this.dataSourceCuentas = new MatTableDataSource(this._carroService.listaCuentas);
  }
}
