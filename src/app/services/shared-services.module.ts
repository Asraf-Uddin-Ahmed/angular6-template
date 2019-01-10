import { DateTimeService } from './date-time.service';
import { MathService } from './math.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertMessageService } from './alert-message.service';
import { HttpService } from './http.service';
import { AppHttpService } from './app-http.service';
import { AuthHttpService } from './auth-http.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    HttpService,
    AppHttpService,
    AuthHttpService,
    MathService,
    AlertMessageService,
    DateTimeService
  ]
})
export class SharedServicesModule { }
