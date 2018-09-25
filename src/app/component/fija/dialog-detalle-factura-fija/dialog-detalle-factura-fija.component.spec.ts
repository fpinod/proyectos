import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleFacturaFijaComponent } from './dialog-detalle-factura-fija.component';

describe('DialogDetalleFacturaFijaComponent', () => {
  let component: DialogDetalleFacturaFijaComponent;
  let fixture: ComponentFixture<DialogDetalleFacturaFijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetalleFacturaFijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetalleFacturaFijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
