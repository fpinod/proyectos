import { Component, OnInit } from '@angular/core';
import { SeleccionarTipoService } from '../../service/seleccionar-tipo/seleccionar-tipo.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  nombre_empresa = '';
  constructor(private _seleccionarTipoService: SeleccionarTipoService) { }

  ngOnInit() {
    this.nombre_empresa = 'Ejercito De Chile Vi Division Arica';
  }

}
