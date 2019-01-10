import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { HttpService } from './http.service';

import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService extends HttpService {

  private readonly baseUrl = 'http://192.168.0.108:8081/';
  private readonly authorizationHeder = 'Basic ' + btoa('postman-client:1234');

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  get(pathOrUrl: string, searchItems?: object) {
    this.loadHeaders();
    return super.get(this.getUrl(pathOrUrl), searchItems);
  }

  post(pathOrUrl: string, data: object | string) {
    this.loadHeaders();
    return super.post(this.getUrl(pathOrUrl), data);
  }

  put(pathOrUrl: string, data: object) {
    this.loadHeaders();
    return super.put(this.getUrl(pathOrUrl), data);
  }

  delete(pathOrUrl: string) {
    this.loadHeaders();
    return super.delete(this.getUrl(pathOrUrl));
  }

  obtainToken(username: string, password: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);

    this.requestOptions.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.authorizationHeder
    };

    return this.postWithoutLoadingHeaders('oauth/token', urlSearchParams.toString());
  }


  getUrl(pathOrUrl: string) {
    return pathOrUrl.indexOf(this.baseUrl) === 0 ? pathOrUrl : (this.baseUrl + pathOrUrl);
  }

  private postWithoutLoadingHeaders(pathOrUrl: string, data: object | string) {
    return super.post(this.getUrl(pathOrUrl), data);
  }

  private loadHeaders() {
    this.requestOptions.headers = {
      'Authorization': this.authorizationHeder
    };
  }

}
