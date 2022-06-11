import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFromJavaComponent } from './report-from-java.component';

describe('ReportFromJavaComponent', () => {
  let component: ReportFromJavaComponent;
  let fixture: ComponentFixture<ReportFromJavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFromJavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFromJavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
