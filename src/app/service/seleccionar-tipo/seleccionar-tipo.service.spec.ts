import { TestBed, inject } from '@angular/core/testing';

import { SeleccionarTipoService } from './seleccionar-tipo.service';

describe('SeleccionarTipoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeleccionarTipoService]
    });
  });

  it('should be created', inject([SeleccionarTipoService], (service: SeleccionarTipoService) => {
    expect(service).toBeTruthy();
  }));
});
