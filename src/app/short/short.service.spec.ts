import { TestBed } from '@angular/core/testing';

import { ShortService } from './short.service';

describe('ShortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShortService = TestBed.get(ShortService);
    expect(service).toBeTruthy();
  });
});
