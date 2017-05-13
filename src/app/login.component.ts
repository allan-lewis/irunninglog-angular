import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from "rxjs";
import { AuthModel } from './auth.model';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';

@Component({
  selector: 'irl-component-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    authModel: Observable<AuthModel>;

    constructor(public authService: AuthService, store: Store<AppState>) {
        this.authModel = store.select(state => state.auth);
    }

    ngOnInit() {
        this.authModel.subscribe(x => console.log('login.component:authModel:next', x));

        console.log('login.component:ngOnInit', localStorage.getItem('strava_access_token'));
    }

    login() {
        console.log('login.component:login');
    }

}
