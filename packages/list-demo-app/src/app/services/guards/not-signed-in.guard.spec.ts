import { TestBed, async, inject } from '@angular/core/testing';

import { NotSignedInGuard } from './not-signed-in.guard';

describe('NotSignedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotSignedInGuard]
    });
  });

  it('should ...', inject([NotSignedInGuard], (guard: NotSignedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
