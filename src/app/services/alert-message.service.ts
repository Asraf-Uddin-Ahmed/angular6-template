import { Injectable } from '@angular/core';
import { type } from 'os';

@Injectable()
export class AlertMessageService {

  isShow: any = false;
  message: string = null;
  type: string = null;

  constructor() { }

  setSuccess(message: string) {
    this.message = message;
    this.isShow = true;
    this.type = AlertMessageType[AlertMessageType.success];
  }
  setError(message: string) {
    this.message = message;
    this.isShow = true;
    this.type = AlertMessageType[AlertMessageType.danger];
  }
  setWarning(message: string) {
    this.message = message;
    this.isShow = true;
    this.type = AlertMessageType[AlertMessageType.warning];
  }
  setInfo(message: string) {
    this.message = message;
    this.isShow = true;
    this.type = AlertMessageType[AlertMessageType.info];
  }
}

enum AlertMessageType {
  success,
  danger,
  info,
  warning,
  primary,
  secondary,
  light,
  dark
}
