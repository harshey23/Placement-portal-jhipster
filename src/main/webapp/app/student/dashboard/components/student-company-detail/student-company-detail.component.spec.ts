import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompanyDetailComponent } from './student-company-detail.component';

describe('StudentCompanyDetailComponent', () => {
  let component: StudentCompanyDetailComponent;
  let fixture: ComponentFixture<StudentCompanyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCompanyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
