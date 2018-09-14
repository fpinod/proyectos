import { Injectable } from '@angular/core';
import { Cuenta } from '../../model/movil/cuenta';
import { SelectionModel } from '@angular/cdk/collections';
import { Documento } from '../../model/movil/documento';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  selection_movil = new SelectionModel<Cuenta>(true, []);
  selection_movil_documento = new SelectionModel<Documento>(true, []);

  constructor() { }

}
