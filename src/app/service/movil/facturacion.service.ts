import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from '../../model/movil/cuenta';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  cuentas: Cuenta[];
  dataSource;

  constructor(private http: HttpClient) {}

  getCuentas() {
    this.http.get('./../../../assets/data/cuentas.json').subscribe(data =>
      this.cuentas = (data as Cuenta[]));

    return this.http.get('./../../../assets/data/cuentas.json');
  }

  downloadPDF() {
    return '../../../assets/doc/Documento_Cliente_17812362.pdf';
  }
}
