import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstReviewExperienceComponent } from './first-review-experience.component';

describe('FirstReviewExperienceComponent', () => {
  let component: FirstReviewExperienceComponent;
  let fixture: ComponentFixture<FirstReviewExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstReviewExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstReviewExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
