import { Errors } from './errors';
import { FormControl } from '@angular/forms';

export class StringValidator {

  static required(formControl: FormControl) {
    return formControl.value !== '' ? null : {error: Errors.REQUIRED};
  }

  static minLength(length: number) {
    return (formControl: FormControl) => {
      return formControl.value.length >= length ? null : {error: Errors.TOO_SHORT};
    };
  }

  static isOnlyLetters(formControl: FormControl) {
    const letterRegex = new RegExp(/^[a-z]+$/i);
    return letterRegex.test(formControl.value) ? null : {error: Errors.NOT_ONLY_LETTERS};
  }

  static isEmail(formControl: FormControl) {
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return emailRegex.test(formControl.value) ? null : {error: Errors.BADLY_FORMATTED_EMAIL};
  }
}
