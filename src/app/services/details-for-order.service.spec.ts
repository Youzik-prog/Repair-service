import { TestBed } from '@angular/core/testing';

import { DetailsForOrderService } from './details-for-order.service';

describe('DetailsForOrderService', () => {
  let service: DetailsForOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsForOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
