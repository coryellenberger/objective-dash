import { TestBed, inject } from '@angular/core/testing';

import {FakeBackendInterceptor, fakeBackendProvider} from './fakebackend.interceptor';

describe('FakebackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [fakeBackendProvider]
    });
  });

  it('should be created', inject([fakeBackendProvider], (service: FakeBackendInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
