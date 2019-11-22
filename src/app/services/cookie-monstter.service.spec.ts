import { TestBed } from '@angular/core/testing';

import { CookieMonstterService } from './cookie-monstter.service';

describe('CookieMonstterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CookieMonstterService = TestBed.get(CookieMonstterService);
    expect(service).toBeTruthy();
  });
});
