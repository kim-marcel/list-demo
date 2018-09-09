import { Pipe, PipeTransform } from '@angular/core';
import { TextService } from '../services';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  constructor(private textService: TextService) {
  }

  transform(value: string): string {
    return this.textService.get(value);
  }

}
