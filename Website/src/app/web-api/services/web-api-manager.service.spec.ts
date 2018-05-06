import { TestBed, inject } from '@angular/core/testing';

import { WebApiManagerService } from './web-api-manager.service';

describe('WebApiManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebApiManagerService]
    });
  });

  it('should be created', inject([WebApiManagerService], (service: WebApiManagerService) => {
    expect(service).toBeTruthy();
  }));
});
