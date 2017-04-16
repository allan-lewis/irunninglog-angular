// app/auth.service.ts

import { Injectable }      from '@angular/core';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('ErpQcu2xzHpzL2d72dqrqhWhMt7mYI9a', 'irunninglog.auth0.com', {});


  jwtHelper: JwtHelper = new JwtHelper();

  public result: any;

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    if (localStorage.getItem('id_token')) {
      this.result = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
    }

    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  }

}
