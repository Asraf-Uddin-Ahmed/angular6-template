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
}
