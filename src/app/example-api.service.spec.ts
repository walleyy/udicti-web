import { TestBed } from '@angular/core/testing';

import { ExampleApiService } from './example-api.service';

describe('ExampleApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExampleApiService = TestBed.get(ExampleApiService);
    expect(service).toBeTruthy();
  });
});
