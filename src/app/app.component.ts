import { Component } from '@angular/core';

import 'hammerjs';
import { SeleccionarTipoService } from './service/seleccionar-tipo/seleccionar-tipo.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _seleccionarTipoService: SeleccionarTipoService) {
  }

}
