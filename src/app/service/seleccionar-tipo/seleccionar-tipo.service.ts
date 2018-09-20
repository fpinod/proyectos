import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeleccionarTipoService {

  selected: String = 'movil';

  constructor() { }
}
