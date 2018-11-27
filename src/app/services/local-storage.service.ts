import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private localStorage: LocalStorage
  ) { }

  storeToken(tokenStr: string) {
    localStorage.setItem(LocalStorageKeys.TOKEN_PLAIN, tokenStr);
  }
  getToken() {
    return localStorage.getItem(LocalStorageKeys.TOKEN_PLAIN);
  }
  clearToken() {
    localStorage.removeItem(LocalStorageKeys.TOKEN_PLAIN);
  }

  storeUserData(userData: object) {
    return this.localStorage.setItem(LocalStorageKeys.USER_DATA, userData);
  }
  getUserData() {
    return this.localStorage.getItem(LocalStorageKeys.USER_DATA);
  }
  clearUserData() {
    return this.localStorage.removeItem(LocalStorageKeys.USER_DATA);
  }

  storeBranchData(branchData: object) {
    return this.localStorage.setItem(LocalStorageKeys.BRANCH_DATA, branchData);
  }
  getBranchData() {
    return this.localStorage.getItem(LocalStorageKeys.BRANCH_DATA);
  }
  clearBranchData() {
    return this.localStorage.removeItem(LocalStorageKeys.BRANCH_DATA);
  }

}


export class LocalStorageKeys {
  public static TOKEN_PLAIN = 'TOKEN_PLAIN';
  public static USER_DATA = 'USER_DATA';
  public static BRANCH_DATA = 'BRANCH_DATA';
}
