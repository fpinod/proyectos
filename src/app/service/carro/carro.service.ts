import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
// movil
import { Cuenta } from '../../model/movil/cuenta';
import { Documento } from '../../model/movil/documento';
// fija
import { Cuentafija } from '../../model/fija/cuentafija';
import { Documentofija } from '../../model/fija/documentofija';

export interface FacturasSeleccionadas {
  tipo: string;
  cuenta: number;
  factura: number;
  monto: number;
  
}
export interface CuentasSeleccionadas {
  tipo: string;
  cuenta: number;
  factura: number;
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  selection_movil = new SelectionModel<Cuenta>(true, []);
  selection_movil_documento = new SelectionModel<Documento>(true, []);
  selection_fija = new SelectionModel<Cuentafija>(true, []);
  selection_fija_documento = new SelectionModel<Documentofija>(true, []);

  listaFacturas = Array<FacturasSeleccionadas>();

  constructor() {}

  getFacturas() {
    this.listaFacturas = Array<FacturasSeleccionadas>();
    for (
      let index = 0;
      index < this.selection_movil_documento.selected.length;
      index++
    ) {
      if (!this.isAllSelected(index)) {
        const element = this.selection_movil_documento.selected[index];
        const agregar: FacturasSeleccionadas = {
          tipo: 'movil',
          cuenta: 1,
          factura: element.factura,
          monto: element.valor
        };
        this.listaFacturas.push(agregar);
      }
    }
    return this.listaFacturas;
  }

  getCuentas() {

  }

  isAllSelected(i: number) {
    const element = this.selection_movil_documento.selected[i];
    for (let index = 0; index < this.selection_movil.selected.length; index++) {
      for (
        let index2 = 0;
        index2 < this.selection_movil.selected[index].documentos.length;
        index2++
      ) {
        if (
          this.selection_movil.selected[index].documentos[index2] ===
          this.selection_movil_documento.selected[i]
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
