import { FormControl } from '@angular/forms';

export class StringValidator {

  static isEmail(formControl: FormControl) {
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return emailRegex.test(formControl.value) ? null : {isEmail: true};
  }

  static isOnlyLetters(formControl: FormControl) {
    const letterRegex = new RegExp(/^[a-z]+$/i);
    return letterRegex.test(formControl.value) ? null : {isText: true};
  }
}
