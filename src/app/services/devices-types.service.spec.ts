import { TestBed } from '@angular/core/testing';

import { DevicesTypesService } from './devices-types.service';

describe('DevicesTypesService', () => {
  let service: DevicesTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
