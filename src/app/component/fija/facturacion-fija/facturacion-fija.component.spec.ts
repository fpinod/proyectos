import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionFijaComponent } from './facturacion-fija.component';

describe('FacturacionFijaComponent', () => {
  let component: FacturacionFijaComponent;
  let fixture: ComponentFixture<FacturacionFijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionFijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionFijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
