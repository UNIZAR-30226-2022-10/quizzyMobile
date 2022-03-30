import { TestBed } from '@angular/core/testing';

import { RemoteServiceSignUp } from './remote-service.service';

describe('RemoteServiceSignUp', () => {
  let service: RemoteServiceSignUp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteServiceSignUp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
