import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInputPropertyComponent } from './add-input-property.component';

describe('AddInputPropertyComponent', () => {
  let component: AddInputPropertyComponent;
  let fixture: ComponentFixture<AddInputPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInputPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInputPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
