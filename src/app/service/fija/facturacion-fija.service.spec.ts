import { TestBed, inject } from '@angular/core/testing';

import { FacturacionFijaService } from './facturacion-fija.service';

describe('FacturacionFijaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacturacionFijaService]
    });
  });

  it('should be created', inject([FacturacionFijaService], (service: FacturacionFijaService) => {
    expect(service).toBeTruthy();
  }));
});
