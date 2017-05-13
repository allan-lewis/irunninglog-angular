import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs/Observable';
import { LOGIN } from './auth.reducer';

@Injectable()
export class LoginService {
  
  constructor(private store: Store<AppState>, private http: Http) {

  }

  login(code: string) {
    console.log('login.service:login', code);

    this.http.get('api/login?code=' + code).catch(this.error).subscribe(x => this.response(x));
  }

  private error(error: Response | any) {
    console.log('login.service:error', error);
    return Observable.throw('login failed');
  }

  private response(response: Response) {
    let json = response.json();

    console.log('login.service:response', response.status, response.json());

    this.store.dispatch({type: LOGIN, payload: {id: json['id'], token: json['token']}});
  }

}
