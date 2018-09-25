import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuentafija } from '../../model/fija/cuentafija';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class FacturacionFijaService {

  cuentas: Cuentafija[];
  dataSource;

  constructor(private http: HttpClient) {

  }

  getCuentas() {
    this.http.get('./../../../assets/data/cuentas-fija.json').subscribe(data =>
       this.cuentas = (data as Cuentafija[]));

    return this.http.get('./../../../assets/data/cuentas-fija.json');
  }

  downloadPDF() {
    return '../../../assets/doc/Documento_Cliente_17812362.pdf';
  }
}
