import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  storeToken(tokenStr: string) {
    const jwtHelperService = new JwtHelperService();
    const decodedToken = jwtHelperService.decodeToken(tokenStr);
    this.localStorageService.storeToken(tokenStr);
    return this.localStorageService.storeUserData(decodedToken);
  }

  getTokenData() {
    return this.localStorageService.getUserData();
  }

  getToken() {
    return this.localStorageService.getToken();
  }

  logout() {
    return this.localStorageService.clearUserData().subscribe(ud => {
      this.localStorageService.clearBranchData().subscribe(bd => {
        this.localStorageService.clearToken();
      });
    });
  }

  getUserId(userData: object) {
    return userData['sub'];
  }

  getUsername(userData: object) {
    return userData['user_name'];
  }

  getRoles(userData: object): string[] {
    userData['authorities'] = userData['authorities'] ? userData['authorities'] : [];
    return userData['authorities'].map(a => a.replace(/ROLE_/gi, ''));
  }

  hasRole(userData: object, role: UserRole) {
    return this.getRoles(userData).includes(UserRole[role]);
  }

  storeBranchData(branchData: object) {
    return this.localStorageService.storeBranchData(branchData);
  }

  getBranchData() {
    return this.localStorageService.getBranchData();
  }


}

export enum UserRole {
  ADMIN,
  ORGANIZATION_OWNER,
  BRANCH_MANAGER,
  USER
}
