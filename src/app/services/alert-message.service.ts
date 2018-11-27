import { Injectable } from '@angular/core';
import { type } from 'os';

@Injectable()
export class AlertMessageService {

  isShow: any = false;
  message: string = null;
  messageType: string = null;
  subErrors: { field: string, message: string }[] = [];
  isShowInNextPage = false;

  constructor() {
    this.init();
  }

  init() {
    this.isShow = false;
    this.message = null;
    this.messageType = null;
    this.subErrors = [];
    this.isShowInNextPage = false;
    return this;
  }
  setSuccess(message: string) {
    this.message = message;
    this.isShow = true;
    this.messageType = AlertMessageType[AlertMessageType.success];
    return this;
  }
  setError(message: string, subErrors?: { field: string, message: string }[]) {
    this.message = message;
    this.isShow = true;
    this.messageType = AlertMessageType[AlertMessageType.danger];
    this.subErrors = subErrors ? subErrors : [];
    return this;
  }
  setWarning(message: string) {
    this.message = message;
    this.isShow = true;
    this.messageType = AlertMessageType[AlertMessageType.warning];
    return this;
  }
  setInfo(message: string) {
    this.message = message;
    this.isShow = true;
    this.messageType = AlertMessageType[AlertMessageType.info];
    return this;
  }
  showInNextPage() {
    this.isShowInNextPage = true;
    return this;
  }
  hideInNextPage() {
    this.isShowInNextPage = false;
    return this;
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
