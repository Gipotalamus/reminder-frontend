import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLeft'
})
export class TimeLeftPipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    const currentDate = new Date(Date.now());
    const eventDate = new Date(value);
    eventDate.setFullYear(currentDate.getFullYear());
    currentDate.setHours(0);
    let difference = Math.ceil((<any>eventDate - <any>currentDate) / (1000 * 60 * 60 * 24));
    difference = difference < 0 ? difference + 365 : difference;
    const plural = difference > 1 ? 's' : '';
    return `${difference} day${plural} left`;
  }

}
