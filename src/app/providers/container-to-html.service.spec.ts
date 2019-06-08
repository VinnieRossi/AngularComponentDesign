import { TestBed } from '@angular/core/testing';

import { ContainerToHtmlService } from './container-to-html.service';

describe('ContainerToHtmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContainerToHtmlService = TestBed.get(ContainerToHtmlService);
    expect(service).toBeTruthy();
  });
});
