import { TestBed } from '@angular/core/testing';

import { ContainerCreationService } from './container-creation.service';

describe('ContainerCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContainerCreationService = TestBed.get(ContainerCreationService);
    expect(service).toBeTruthy();
  });
});
