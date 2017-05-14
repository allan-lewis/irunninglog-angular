import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs/Observable';
import { LOGIN, UNAUTHENTICATED } from './auth.reducer';

@Injectable()
export class LoginService {
  
  constructor(private store: Store<AppState>, private http: Http) {

  }

  login(code: string) {
    console.log('login.service:login', code);

    this.http.get('api/login?code=' + code).catch(err => {
          return this.error(err);
        }).subscribe(x => this.response(x));
  }

  unauthenticated() {
    console.log('login.service:unauthenticated');

    this.store.dispatch({type: UNAUTHENTICATED});
  }

  private error(error: Response | any) {
    console.log('login.service:error', error);

    this.unauthenticated();
    
    return Observable.throw('login failed');
  }

  private response(response: Response) {
    let json = response.json();

    console.log('login.service:response', response.status, response.json());

    this.store.dispatch({type: LOGIN, payload: {id: json['id'], token: json['token']}});
  }

}
