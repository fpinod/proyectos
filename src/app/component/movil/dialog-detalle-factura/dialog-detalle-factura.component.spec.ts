import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleFacturaComponent } from './dialog-detalle-factura.component';

describe('DialogDetalleFacturaComponent', () => {
  let component: DialogDetalleFacturaComponent;
  let fixture: ComponentFixture<DialogDetalleFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDetalleFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetalleFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
