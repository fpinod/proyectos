import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Documento } from '../../model/movil/documento';
import { FacturacionComponent } from '../movil/facturacion/facturacion.component';
import { CarroService } from '../../service/carro/carro.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {
  @Input() lista: Array<Documento>;

  total = 0;
  cant_seleccionados = 0;

  constructor(private _carroService: CarroService) {

   }

  ngOnInit() {

  }

  ngOnChanges() {
    this.total = 0;
    for (let index = 0; index < this._carroService.selection_movil_documento.selected.length; index++) {
      this.total = this.total + this._carroService.selection_movil_documento.selected[index].deuda;
    }
    for (let index = 0; index < this._carroService.selection_fija_documento.selected.length; index++) {
      this.total = this.total + this._carroService.selection_fija_documento.selected[index].deuda;
    }
    this.cant_seleccionados = this._carroService.selection_movil_documento.selected.length +
                              this._carroService.selection_fija_documento.selected.length;
  }

}
