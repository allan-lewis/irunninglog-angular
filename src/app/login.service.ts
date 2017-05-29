import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs/Observable';
import { LOGIN, LOGOUT } from './auth.reducer';
import { AbstractService } from './abstract.service';

@Injectable()
export class LoginService extends AbstractService {
  
  constructor(public store: Store<AppState>, public http: Http) {
      super(store, http);
   }

  login(code: string) {
    localStorage.setItem('strava_code', code);

    this.http.get('api/login?code=' + code).catch(err => {
          this.logout();

          return this.error(err);
        }).subscribe(x => this.response(x));
  }

  logout() {
    localStorage.removeItem('strava_code');
    sessionStorage.removeItem('strava_state');
    this.store.dispatch({type: LOGOUT});
  }

  getCode() {
    return localStorage.getItem('strava_code');
  }

  getState() {
    return sessionStorage.getItem('strava_state');
  }

  setState(value : string) {
    sessionStorage.setItem('strava_state', value);
  }

  private response(response: Response) {
    let json = response.json();

    this.store.dispatch({type: LOGIN, payload: {id: json['id'], token: json['token']}});
  }

}
