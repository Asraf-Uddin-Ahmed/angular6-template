import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class AppHttpService extends HttpService {

  private readonly baseUrl = 'http://192.168.0.108:8080/';

  constructor(protected httpClient: HttpClient,
    private accountService: AccountService,
  ) {
    super(httpClient);
    this.requestOptions.headers = new HttpHeaders();
  }

  get(pathOrUrl: string, searchItems?: object): Observable<Object> {
    this.loadHeaders();
    return super.get(this.getUrl(pathOrUrl), searchItems);
  }

  post(pathOrUrl: string, data: object): Observable<Object> {
    this.loadHeaders();
    return super.post(this.getUrl(pathOrUrl), data);
  }

  put(pathOrUrl: string, data: object): Observable<Object> {
    this.loadHeaders();
    return super.put(this.getUrl(pathOrUrl), data);
  }

  delete(pathOrUrl: string, data?: object): Observable<Object> {
    this.loadHeaders();
    return data ?
      super.post(this.getUrl(pathOrUrl) + '?x-http-method=DELETE', data) :
      super.delete(this.getUrl(pathOrUrl));
  }

  loadAndSearch(searchItems: object, fieldName: string, fieldValue: string) {
    searchItems['andSearch'] = searchItems['andSearch'] ? searchItems['andSearch'] : [];
    searchItems['andSearch'].push(fieldName + '==' + fieldValue);
    return this;
  }
  loadArrayOnAndSearch(searchItems: object, fieldName: string, fieldValue: string[]) {
    searchItems['andSearch'] = searchItems['andSearch'] ? searchItems['andSearch'] : [];
    searchItems['andSearch'].push(fieldName + '=in=(' + fieldValue.join(',') + ')');
    return this;
  }
  loadAndSearchFromSearchItem(searchItems: object, objectKey: string, fieldName: string) {
    searchItems['andSearch'] = searchItems['andSearch'] ? searchItems['andSearch'] : [];
    if (searchItems[objectKey] !== undefined && searchItems[objectKey] !== '' && searchItems[objectKey] !== null) {
      searchItems['andSearch'].push(fieldName + '==' + searchItems[objectKey]);
    }
    delete searchItems[objectKey];
    return this;
  }
  removeAndSearch(searchItems: object, fieldName: string) {
    searchItems['andSearch'] = searchItems['andSearch'] ? searchItems['andSearch'] : [];
    _.remove(searchItems['andSearch'], (value: string) => {
      return value.startsWith(fieldName);
    });
    return this;
  }

  loadOrSearch(searchItems: object, fieldName: string, fieldValue: string) {
    searchItems['search'] = searchItems['search'] ? searchItems['search'] : [];
    searchItems['search'].push(fieldName + '==' + fieldValue);
    return this;
  }
  loadArrayOnOrSearch(searchItems: object, fieldName: string, fieldValue: string[]) {
    searchItems['search'] = searchItems['search'] ? searchItems['search'] : [];
    searchItems['search'].push(fieldName + '=in=(' + fieldValue.join(',') + ')');
    return this;
  }
  removeOrSearch(searchItems: object, fieldName: string) {
    searchItems['search'] = searchItems['search'] ? searchItems['search'] : [];
    _.remove(searchItems['search'], (value: string) => {
      return value.startsWith(fieldName);
    });
    return this;
  }

  protected loadSearchToRequestOptions(searchItems: object) {
    let httpParams = new HttpParams();
    let orSearch = '';
    let andSearch = '';

    for (const key in searchItems) {
      if (searchItems.hasOwnProperty(key)) {
        const value = searchItems[key];
        if (key === 'search') {
          orSearch = value.join(',');
          continue;
        } else if (key === 'andSearch') {
          andSearch = value.join(';');
          continue;
        }
        Array.isArray(value) ?
          value.forEach(elem => httpParams = httpParams.append(key, elem)) :
          (httpParams = httpParams.append(key, value));
      }
    }

    orSearch = orSearch ? '(' + orSearch + ')' : '';
    const searchStr = orSearch + (orSearch && andSearch ? ';' : '') + andSearch;
    if (searchStr) {
      httpParams = httpParams.append('search', searchStr);
    }
    this.requestOptions.params = httpParams;
  }

  private getUrl(pathOrUrl: string) {
    return pathOrUrl.indexOf(this.baseUrl) === 0 ? pathOrUrl : (this.baseUrl + pathOrUrl);
  }

  private loadHeaders() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.accountService.getToken()
    });
    this.requestOptions.headers = headers;
  }
}
