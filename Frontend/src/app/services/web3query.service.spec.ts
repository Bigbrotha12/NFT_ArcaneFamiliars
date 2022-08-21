import { TestBed } from '@angular/core/testing';

import { Web3queryService } from './web3query.service';

describe('Web3queryService', () => {
  let service: Web3queryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Web3queryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
