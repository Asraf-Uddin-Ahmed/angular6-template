import { Component, OnInit } from '@angular/core';

import { AlertMessageService } from '../../services/alert-message.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})

export class AlertMessageComponent implements OnInit {

  isShow = false;
  messageType = null;
  message = null;

  constructor(public alertMessageService: AlertMessageService) { }

  ngOnInit() {
  }

  closeAlert() {
    this.alertMessageService.isShow = false;
  }
}
