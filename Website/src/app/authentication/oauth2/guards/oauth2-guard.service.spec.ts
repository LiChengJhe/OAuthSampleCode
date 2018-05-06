import { TestBed, inject } from '@angular/core/testing';

import { Oauth2GuardService } from './oauth2-guard.service';

describe('Oauth2GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Oauth2GuardService]
    });
  });

  it('should be created', inject([Oauth2GuardService], (service: Oauth2GuardService) => {
    expect(service).toBeTruthy();
  }));
});
