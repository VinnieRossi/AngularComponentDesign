import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponentModalComponent } from './edit-component-modal.component';

describe('EditComponentModalComponent', () => {
  let component: EditComponentModalComponent;
  let fixture: ComponentFixture<EditComponentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
