export enum AuthErrorCode {
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL = 'auth/account-exists-with-different-credential',
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  INVALID_EMAIL = 'auth/invalid-email',
  POPUP_BLOCKED = 'auth/popup-blocked',
  POPUP_CLOSED_BY_USER = 'auth/popup-closed-by-user',
  USER_DISABLED = 'auth/user-disabled',
  USER_NOT_FOUND = 'auth/user-not-found',
  USER_TOKEN_EXPIRED = 'auth/user-token-expired',
  WEAK_PASSWORD = 'auth/weak-password',
  WRONG_PASSWORD = 'auth/wrong-password',
}
