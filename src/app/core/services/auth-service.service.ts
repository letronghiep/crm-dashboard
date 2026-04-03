import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return false;

    try {
      return !this.jwtHelper.isTokenExpired(accessToken);
    } catch (error) {
      return false;
    }
  }
}
