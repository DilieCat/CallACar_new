import { TestBed } from '@angular/core/testing';

import { DummydataService } from './dummydata.service';

describe('DummydataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DummydataService = TestBed.get(DummydataService);
    expect(service).toBeTruthy();
  });
});
