import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(abstractControl: AbstractControl) {
    const password = abstractControl.get('password').value;
    const passwordConfirm = abstractControl.get('passwordConfirm').value;

    if (password !== passwordConfirm) {
      abstractControl.get('passwordConfirm').setErrors({MatchPassword: true});
    }

    return null;
  }

}
