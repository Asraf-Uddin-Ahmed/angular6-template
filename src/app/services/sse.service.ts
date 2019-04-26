import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  private readonly OTHER_OPTIONS = {
    headers: {}
  };
  
  constructor() {
    this.OTHER_OPTIONS.headers = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOm51bGwsInN1YiI6MSwidXNlcl9uYW1lIjoicmF0dWwiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgxIiwiZXhwIjoxNTU2MzE5NzgwMDU4LCJhdXRob3JpdGllcyI6WyJST0xFX0FOT05ZTU9VUyIsIlJPTEVfQURNSU4iXSwianRpIjoiNDY0ZWYzNjUtMGFkNy00MjRjLWJkMWUtOWY0YjY3NGI5YjM0IiwiY2xpZW50X2lkIjoicG9zdG1hbi1jbGllbnQifQ.SEsBqvL3anL-H4_6fwb2mFx8AZ2B-9vzyA3QDb0kkhE' //+ this.accountService.getToken()
    };
  }

  observeMessagesWithHeaders(sseUrl: string): Observable<string> {
      return new Observable<string>(obs => {
          const eventSourcePolyfill = new EventSourcePolyfill(sseUrl, this.OTHER_OPTIONS);
          eventSourcePolyfill.addEventListener('message', (evt) => {
              console.log(evt['data']);
              obs.next(evt['data']);
          });
          return () => eventSourcePolyfill.close();
      });
  }

  observeMessagesWithoutHeaders(sseUrl: string): Observable<string> {
    return new Observable<string>(obs => {
        const eventSource = new EventSourcePolyfill(sseUrl);
        eventSource.addEventListener('message', (evt) => {
            console.log(evt['data']);
            obs.next(evt['data']);
        });
        return () => eventSource.close();
    });
}

}
