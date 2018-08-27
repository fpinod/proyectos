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
}
