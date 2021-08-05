import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(name: string): string {

    if (!name)
      return null;

    const whiteSpace = ' ';
    const temp = name.trim().split(whiteSpace);

    return temp[0].concat(whiteSpace).concat(temp[temp.length-1]).toString();
  }
}