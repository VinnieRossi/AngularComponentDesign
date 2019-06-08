import { TestBed } from '@angular/core/testing';

import { ComponentToTsService } from './component-to-ts.service';

describe('ComponentToTsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentToTsService = TestBed.get(ComponentToTsService);
    expect(service).toBeTruthy();
  });
});
