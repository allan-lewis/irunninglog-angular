import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { AuthModel } from './auth.model';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  constructor(store: Store<AppState>) {
    super();

    this.headers.set('Content-Type', 'application/json');

    store.select(state => state.auth).filter(x => !!x.token).subscribe(x => this.headers.set('Authorization', 'Bearer ' + x.token));
  }

}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };