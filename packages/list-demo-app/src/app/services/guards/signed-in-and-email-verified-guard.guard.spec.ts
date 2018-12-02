import { TestBed, async, inject } from '@angular/core/testing';

import { SignedInAndEmailVerifiedGuardGuard } from './signed-in-and-email-verified-guard.guard';

describe('SignedInAndEmailVerifiedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignedInAndEmailVerifiedGuardGuard]
    });
  });

  it('should ...', inject([SignedInAndEmailVerifiedGuardGuard], (guard: SignedInAndEmailVerifiedGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
