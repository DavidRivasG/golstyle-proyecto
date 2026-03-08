import { TestBed } from '@angular/core/testing';

import { CamisetasService } from './camisetas.service';

describe('CamisetasService', () => {
  let service: CamisetasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamisetasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
