import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs/Observable';
import { LOGIN, UNAUTHENTICATED } from './auth.reducer';
import { AbstractService } from './abstract.service';

@Injectable()
export class LoginService extends AbstractService {
  
  constructor(public store: Store<AppState>, public http: Http) {
      super(store, http);
   }

  login(code: string) {
    this.http.get('api/login?code=' + code).catch(err => {
          this.unauthenticated();

          return this.error(err);
        }).subscribe(x => this.response(x));
  }

  unauthenticated() {
    this.store.dispatch({type: UNAUTHENTICATED});
  }

  private response(response: Response) {
    let json = response.json();

    this.store.dispatch({type: LOGIN, payload: {id: json['id'], token: json['token']}});
  }

}
