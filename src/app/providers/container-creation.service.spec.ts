import { TestBed } from '@angular/core/testing';

import { ContainerCodeGenerationService } from './container-code-generation.service';

describe('ContainerCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContainerCodeGenerationService = TestBed.get(ContainerCodeGenerationService);
    expect(service).toBeTruthy();
  });
});
