import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

  protected readonly requestOptions: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };

  constructor(protected httpClient: HttpClient) {
    this.requestOptions = {};
  }

  get(url: string, searchItems?: object): Observable<Object> {
    this.loadSearchToRequestOptions(searchItems);
    // console.log(this.requestOptions);
    return this.httpClient.get(url, this.requestOptions);
  }

  post(url: string, data: object | string): Observable<Object> {
    return this.httpClient.post(url, data, this.requestOptions);
  }

  put(url: string, data: object): Observable<Object> {
    return this.httpClient.put(url, data, this.requestOptions);
  }

  delete(url: string): Observable<Object> {
    return this.httpClient.delete(url, this.requestOptions);
  }


  protected loadSearchToRequestOptions(searchItems: object) {
    let search = new HttpParams();
    for (const key in searchItems) {
      if (searchItems.hasOwnProperty(key)) {
        const value = searchItems[key];
        Array.isArray(value) ? value.forEach(elem => search = search.append(key, elem)) : (search = search.append(key, value));
      }
    }
    this.requestOptions.params = search;
  }

}
