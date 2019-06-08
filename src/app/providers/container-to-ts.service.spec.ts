import { TestBed } from '@angular/core/testing';

import { ContainerToTsService } from './container-to-ts.service';

describe('ContainerToTsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContainerToTsService = TestBed.get(ContainerToTsService);
    expect(service).toBeTruthy();
  });
});
