import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AuthenticationModel } from '../state/authentication.model';

@Injectable()
export class AppRequestOptions extends BaseRequestOptions {

  constructor(store: Store<AppState>) {
    super();

    this.headers.set('Content-Type', 'application/json');

    store.select(state => state.authentication).filter(x => !!x.token).subscribe(x => this.headers.set('Authorization', 'Bearer ' + x.token));
  }

}

export const requestOptionsProvider = { provide: RequestOptions, useClass: AppRequestOptions };
