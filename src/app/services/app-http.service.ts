import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable()
export class AppHttpService extends HttpService {

  private readonly baseUrl = 'http://localhost:4873/';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const headers = new HttpHeaders({ 'Client-Id': 'ng5DevRatulApp' });
    this.requestOptions.headers = headers;
  }

  get(pathOrUrl: string, searchItems?: object) {
    return super.get(this.getUrl(pathOrUrl), searchItems);
  }

  post(pathOrUrl: string, data: object) {
    return super.post(this.getUrl(pathOrUrl), data);
  }

  put(pathOrUrl: string, data: object) {
    return super.put(this.getUrl(pathOrUrl), data);
  }

  delete(pathOrUrl: string) {
    return super.delete(this.getUrl(pathOrUrl));
  }


  private getUrl(pathOrUrl: string) {
    return pathOrUrl.indexOf(this.baseUrl) === 0 ? pathOrUrl : (this.baseUrl + pathOrUrl);
  }
}
