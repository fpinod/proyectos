import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeadComponent } from './component/head/head.component';
import { FooterComponent } from './component/footer/footer.component';
import { MenuComponent } from './component/menu/menu.component';
import { SubHeadComponent } from './component/sub-head/sub-head.component';

// MATERIAL
import { MaterialModule } from './material';
// ANIMATIONS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FacturacionComponent } from './component/movil/facturacion/facturacion.component';
import { FacturacionService } from './service/movil/facturacion.service';
import { DialogPagarComponent } from './component/movil/dialog-pagar/dialog-pagar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    MenuComponent,
    SubHeadComponent,
    FacturacionComponent,
    DialogPagarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  entryComponents: [
    DialogPagarComponent
  ],
  providers: [FacturacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
