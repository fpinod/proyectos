import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
// movil
import { Cuenta } from '../../model/movil/cuenta';
import { Documento } from '../../model/movil/documento';
// fija
import { Cuentafija } from '../../model/fija/cuentafija';
import { Documentofija } from '../../model/fija/documentofija';



@Injectable({
  providedIn: 'root'
})
export class CarroService {

  selection_movil = new SelectionModel<Cuenta>(true, []);
  selection_movil_documento = new SelectionModel<Documento>(true, []);
  selection_fija = new SelectionModel<Cuentafija>(true, []);
  selection_fija_documento = new SelectionModel<Documentofija>(true, []);

  constructor() { }

}
