import { TestBed } from '@angular/core/testing';

import { ComponentToHtmlService } from './component-to-html.service';

describe('CompoonentToHtmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentToHtmlService = TestBed.get(ComponentToHtmlService);
    expect(service).toBeTruthy();
  });
});
