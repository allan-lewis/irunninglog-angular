import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs/Observable';
import { AUTHENTICATE, UNAUTHENTICATE } from '../state/authentication.reducer';

@Injectable()
export class AuthenticationService {
  
  constructor(public store: Store<AppState>, public http: Http) { }

  login(code: string) {
    localStorage.setItem('strava_code', code);

    this.http.get('api/login?code=' + code).catch(err => {
          this.logout();

          return Observable.of('failed to login');
        }).filter(x => x instanceof Response).map(x => <Response> x).subscribe(x => this.response(x));
  }

  logout() {
    localStorage.removeItem('strava_code');
    sessionStorage.removeItem('strava_state');
    this.store.dispatch({type: UNAUTHENTICATE});
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

    this.store.dispatch({type: AUTHENTICATE, payload: {id: json['id'], token: json['token']}});
  }

  authenticationModel() {
    return this.store.select(state => state.authentication).filter(x => x != null);
  }

}
