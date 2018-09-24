import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FacturacionService } from '../../service/movil/facturacion.service';
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
  tipo_cuenta: string;
  situacion: string;
}
export interface CuentasSeleccionadas {
  tipo: string;
  cuenta: number;
  cant_factura: number;
  monto: number;
  tipo_cuenta: string;
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
  listaCuentas = Array<CuentasSeleccionadas>();

  constructor(private _facturacionService: FacturacionService) {}

  getFacturas() {
    this.listaFacturas = Array<FacturasSeleccionadas>();
    for (let index = 0; index < this.selection_movil_documento.selected.length; index++    ) {
      if (!this.isAllSelected(index)) {
        const c = this.getCuenta(index);
        const element = this.selection_movil_documento.selected[index];
        const agregar: FacturasSeleccionadas = {
          tipo: 'móvil',
          cuenta: c.cuenta,
          factura: element.factura,
          monto: element.valor,
          tipo_cuenta: c.tipo,
          situacion: element.situacion
        };
        this.listaFacturas.push(agregar);
      }
    }
    return this.listaFacturas;
  }

  getCuentas() {
    this.listaCuentas = Array<CuentasSeleccionadas>();
    for (let index = 0; index < this.selection_movil.selected.length; index++    ) {
        const element = this.selection_movil.selected[index];
        const agregar: CuentasSeleccionadas = {
          tipo: 'móvil',
          cuenta: element.cuenta,
          cant_factura: element.documentos.length,
          monto: element.total,
          tipo_cuenta: element.tipo
        };
        this.listaCuentas.push(agregar);
    }
    return this.listaCuentas;
  }

  getCuenta(i: number) {
    for (let index = 0; index < this._facturacionService.cuentas.length; index++) {
      for (let index2 = 0; index2 < this._facturacionService.cuentas[index].documentos.length; index2++ ) {
        if ( this._facturacionService.cuentas[index].documentos[index2].factura ===
             this.selection_movil_documento.selected[i].factura ) {
          return this._facturacionService.cuentas[index];
        }
      }
    }
  }

  isAllSelected(i: number) {
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

  borrarDocumento(factura) {
    for (let index = 0; index < this.listaFacturas.length; index++    ) {
      const element = this.listaFacturas[index];
      if (factura === element.factura) {
        this.listaFacturas.splice(index, 1);
      }
    }
    for (let index = 0; index < this.selection_movil_documento.selected.length; index++    ) {
      const element = this.selection_movil_documento.selected[index];
      if (factura === element.factura) {
        this.selection_movil_documento.toggle(element);
      }
    }
  }
}
