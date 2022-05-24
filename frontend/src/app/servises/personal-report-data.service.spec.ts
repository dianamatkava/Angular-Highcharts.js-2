import { TestBed } from '@angular/core/testing';

import { PersonalReportDataService } from './personal-report-data.service';

describe('PersonalReportDataService', () => {
  let service: PersonalReportDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalReportDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
