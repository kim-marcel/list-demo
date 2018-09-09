import { Injectable } from '@angular/core';
import { texts} from '../resources/texts';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor() { }

  get(key) {
    return texts[key];
  }

}
