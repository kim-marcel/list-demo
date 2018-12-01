import { TestBed, async, inject } from '@angular/core/testing';

import { SignedInAndEmailNotVerifiedGuard } from './signed-in-and-email-not-verified.guard';

describe('SignedInAndEmailNotVerifiedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignedInAndEmailNotVerifiedGuard]
    });
  });

  it('should ...', inject([SignedInAndEmailNotVerifiedGuard], (guard: SignedInAndEmailNotVerifiedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
