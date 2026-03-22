import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardAdminService } from './dashboard-admin.service';

describe('DashboardAdminService', () => {
  let service: DashboardAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DashboardAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
