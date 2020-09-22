import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from './service/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class ChatRouteGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthenticateService) { }

  canActivate() {
    if (!this.auth.isAuthenticated && !this.auth.isTokenInMemory) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
