import { TestBed } from '@angular/core/testing';

import { ComponentCreationService } from './component-creation.service';

describe('ComponentCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentCreationService = TestBed.get(ComponentCreationService);
    expect(service).toBeTruthy();
  });
});
