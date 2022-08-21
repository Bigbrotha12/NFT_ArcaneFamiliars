import { TestBed } from '@angular/core/testing';

import { IMXqueryService } from './imxquery.service';

describe('IMXqueryService', () => {
  let service: IMXqueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IMXqueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
