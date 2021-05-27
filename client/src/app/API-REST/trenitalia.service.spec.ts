import { TestBed } from '@angular/core/testing';

import { TrenitaliaProvaService } from './trenitalia.service';

describe('TrenitaliaProvaService', () => {
  let service: TrenitaliaProvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrenitaliaProvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
