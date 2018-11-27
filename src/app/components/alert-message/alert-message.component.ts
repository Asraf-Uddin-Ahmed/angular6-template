import { Component, OnInit, OnDestroy } from '@angular/core';

import { AlertMessageService } from '../../services/alert-message.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})

export class AlertMessageComponent implements OnInit, OnDestroy {

  constructor(public alertMessageService: AlertMessageService) { }

  ngOnInit() {
    this.alertMessageService.hideInNextPage();
  }

  ngOnDestroy(): void {
    if (!this.alertMessageService.isShowInNextPage) {
      this.alertMessageService.init();
    }
  }

  closeAlert() {
    this.alertMessageService.init();
  }
}
