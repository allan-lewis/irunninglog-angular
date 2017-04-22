import { Injectable }      from '@angular/core';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import Auth0Lock  from 'auth0-lock';
import { Store } from '@ngrx/store';
import {USERNAME_ASSIGN} from './username.reducer';
import {AppState} from './app.state';

@Injectable()
export class Auth {
  lock = new Auth0Lock('ErpQcu2xzHpzL2d72dqrqhWhMt7mYI9a', 'irunninglog.auth0.com', {rememberLastLogin: false});

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private store: Store<AppState>) {
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.updateSubject(this.getSubject());
    });
  }

  public login() {
    this.lock.show();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    this.updateSubject('');
  }

  public checkToken() {
    if (tokenNotExpired()) {
      this.updateSubject(this.getSubject());
    }
  }

  private updateSubject(subject: string) {
    this.store.dispatch({ type: USERNAME_ASSIGN, payload: subject});
  }

  private getSubject() {
    return this.jwtHelper.decodeToken(localStorage.getItem('id_token')).sub;
  }

}
