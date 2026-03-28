import { TestBed } from '@angular/core/testing';

import { CustomHttpService } from './custom-http.service';

describe('CustomHttpService', () => {
  let service: CustomHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
