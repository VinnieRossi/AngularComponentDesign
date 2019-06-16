import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenterDisplayComponent } from './presenter-display.component';

describe('PresenterDisplayComponent', () => {
  let component: PresenterDisplayComponent;
  let fixture: ComponentFixture<PresenterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresenterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
