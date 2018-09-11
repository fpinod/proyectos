import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

import { HttpClientModule } from '@angular/common/http';
import { FacturacionComponent } from './component/movil/facturacion/facturacion.component';
import { FacturacionService } from './service/movil/facturacion.service';
import { DialogPagarComponent } from './component/movil/dialog-pagar/dialog-pagar.component';
import { DialogDocumentosComponent } from './component/movil/dialog-documentos/dialog-documentos.component';
import { DialogFiltrosComponent } from './component/movil/dialog-filtros/dialog-filtros.component';
import { DialogDetalleFacturaComponent } from './component/movil/dialog-detalle-factura/dialog-detalle-factura.component';

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
    DialogDetalleFacturaComponent
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
    DialogFiltrosComponent
  ],
  providers: [FacturacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
