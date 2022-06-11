import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJavaComponent } from './new-java.component';

describe('NewJavaComponent', () => {
  let component: NewJavaComponent;
  let fixture: ComponentFixture<NewJavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
