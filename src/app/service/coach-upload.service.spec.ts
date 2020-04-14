import { TestBed } from '@angular/core/testing';

import { CoachUploadService } from './coach-upload.service';

describe('CoachUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoachUploadService = TestBed.get(CoachUploadService);
    expect(service).toBeTruthy();
  });
});
