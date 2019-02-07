import { Injectable } from '@angular/core';
import * as _moment from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  getDateByFormat(dateTimeStr: string, dateTimeFormat: string) {
    return new moment(dateTimeStr, dateTimeFormat).toDate();
  }
  getDateFromJson(jsonDate: number) {
    return new moment(jsonDate).toDate();
  }
  increaseDay(date: Date, numberOfDay: number): Date {
    date.setDate(date.getDate() + numberOfDay);
    return date;
  }
  decreaseDay(date: Date, numberOfDay: number): Date {
    date.setDate(date.getDate() - numberOfDay);
    return date;
  }
  getStartTimeOfToday(): Date {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }
  getStartTimeOfTomorrow(): Date {
    let date = new Date();
    date = this.increaseDay(date, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  getTimezoneOffsetInMinute(): number {
    return new Date().getTimezoneOffset();
  }
  scaleDateWithTimezoneOffset(date: Date): Date {
    date.setMinutes(-this.getTimezoneOffsetInMinute());
    return date;
  }
}
