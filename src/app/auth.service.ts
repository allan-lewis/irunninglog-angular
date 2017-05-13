import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT } from './auth.reducer';
import { AppState } from './app.state';

@Injectable()
export class AuthService {
  
  constructor(private store: Store<AppState>) {

  }

}
