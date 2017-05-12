import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanActivate
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this._authService.isAuthenticated();
  }
}
