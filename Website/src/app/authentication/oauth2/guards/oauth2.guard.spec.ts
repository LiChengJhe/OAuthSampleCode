import { TestBed, inject } from '@angular/core/testing';
import { Oauth2Guard } from './oauth2.guard';

describe('Oauth2Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Oauth2Guard]
    });
  });

  it('should be created', inject([Oauth2Guard], (service: Oauth2Guard) => {
    expect(service).toBeTruthy();
  }));
});
