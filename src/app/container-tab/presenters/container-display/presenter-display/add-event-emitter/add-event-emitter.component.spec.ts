import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventEmitterComponent } from './add-event-emitter.component';

describe('AddEventEmitterComponent', () => {
  let component: AddEventEmitterComponent;
  let fixture: ComponentFixture<AddEventEmitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventEmitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventEmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
