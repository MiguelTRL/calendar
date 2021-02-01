import { TestBed } from '@angular/core/testing';

import { ClimeService } from './clime.service';

describe('ClimeService', () => {
  let service: ClimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
