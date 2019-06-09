import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponentModalComponent } from './create-component-modal.component';

describe('CreateComponentModalComponent', () => {
  let component: CreateComponentModalComponent;
  let fixture: ComponentFixture<CreateComponentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComponentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
