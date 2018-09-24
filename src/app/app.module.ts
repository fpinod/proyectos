import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import LocaleEsCL from '@angular/common/locales/es-CL';
import { FormsModule } from '@angular/forms';
import {registerLocaleData} from '@angular/common';

registerLocaleData(LocaleEsCL);

import { AppComponent } from './app.component';
import { HeadComponent } from './component/head/head.component';
import { FooterComponent } from './component/footer/footer.component';
import { MenuComponent } from './component/menu/menu.component';
import { SubHeadComponent } from './component/sub-head/sub-head.component';

// MATERIAL
import { MaterialModule } from './material';
// ANIMATIONS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';

import './polyfills';

// SERVICIOS
import { FacturacionService } from './service/movil/facturacion.service';
import { CarroService } from './service/carro/carro.service';
import { SeleccionarTipoService } from './service/seleccionar-tipo/seleccionar-tipo.service';

import { HttpClientModule } from '@angular/common/http';
import { FacturacionComponent } from './component/movil/facturacion/facturacion.component';
import { DialogPagarComponent } from './component/movil/dialog-pagar/dialog-pagar.component';
import { DialogDocumentosComponent } from './component/movil/dialog-documentos/dialog-documentos.component';
import { DialogFiltrosComponent } from './component/movil/dialog-filtros/dialog-filtros.component';
import { DialogDetalleFacturaComponent } from './component/movil/dialog-detalle-factura/dialog-detalle-factura.component';
import { FacturacionFijaComponent } from './component/fija/facturacion-fija/facturacion-fija.component';
import { DialogCarroComponent } from './component/carro/dialog-carro/dialog-carro.component';
import { DialogConfirmacionComponent } from './component/carro/dialog-confirmacion/dialog-confirmacion.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    MenuComponent,
    SubHeadComponent,
    FacturacionComponent,
    DialogPagarComponent,
    DialogDocumentosComponent,
    DialogFiltrosComponent,
    DialogDetalleFacturaComponent,
    FacturacionFijaComponent,
    DialogCarroComponent,
    DialogConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    DialogPagarComponent,
    DialogDocumentosComponent,
    DialogDetalleFacturaComponent,
    DialogFiltrosComponent,
    DialogCarroComponent,
    DialogConfirmacionComponent
  ],
  providers: [FacturacionService, CarroService, SeleccionarTipoService,
    {provide: LOCALE_ID, useValue: 'es-CL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
