import { Injectable }      from '@angular/core';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import Auth0Lock  from 'auth0-lock';
import { Store } from '@ngrx/store';
import {LOGIN, LOGOUT} from './auth.reducer';
import {AppState} from './app.state';

@Injectable()
export class AuthService {
  lock = new Auth0Lock('ErpQcu2xzHpzL2d72dqrqhWhMt7mYI9a', 'irunninglog.auth0.com', {rememberLastLogin: false});

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private store: Store<AppState>) {
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.dispatchLogin(this.getSubject());
    });
  }

  public login() {
    this.lock.show();
  }

  public logout() {
    localStorage.removeItem('id_token');
    this.dispatchLogout();
  }

  public checkToken() {
    if (tokenNotExpired()) {
      this.dispatchLogin(this.getSubject());
    }
  }

  private dispatchLogin(subject: string) {
    this.store.dispatch({type: LOGIN, payload: subject});
  }

  private dispatchLogout() {
    this.store.dispatch({type: LOGOUT});
  }

  private getSubject() {
    return this.jwtHelper.decodeToken(localStorage.getItem('id_token')).sub;
  }

}
