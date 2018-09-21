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

  displayedColumnsCuentas: string[] = ['tipo', 'cuenta', 'factura', 'monto', 'eliminar'];
  dataSourceCuentas = new MatTableDataSource();

  @ViewChild(MatSort)
  sortFacturas: MatSort;

  @ViewChild(MatSort)
  sortCuentas: MatSort;

  ngOnInit() {
    this.dataSourceFacturas.sort = this.sortFacturas;
    this.dataSourceCuentas.sort = this.sortCuentas;
  }
}
