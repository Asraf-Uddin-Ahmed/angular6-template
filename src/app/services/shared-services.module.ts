import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertMessageService } from './alert-message.service';
import { HttpService } from './http.service';
import { AppHttpService } from './app-http.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    HttpService,
    AppHttpService,
    AlertMessageService
  ]
})
export class SharedServicesModule { }
