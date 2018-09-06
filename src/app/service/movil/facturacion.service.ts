import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuenta } from '../../model/movil/cuenta';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  cuentas: Cuenta[];

  constructor(private http: HttpClient) {

  }

  getCuentas(): Observable<any> {
    return this.http.get('./../../../assets/data/cuentas.json');
  }

  downloadPDF() {
    return '../../../assets/doc/Documento_Cliente_17812362.pdf';
  }
}
