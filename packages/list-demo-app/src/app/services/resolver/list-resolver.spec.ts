import { TestBed, inject } from '@angular/core/testing';

import { ListResolver } from './list-resolver';

describe('ListResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListResolver]
    });
  });

  it('should be created', inject([ListResolver], (service: ListResolver) => {
    expect(service).toBeTruthy();
  }));
});
