import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from "rxjs";
import {AuthModel} from './auth.model';
import {Store} from '@ngrx/store';
import {AppState} from './app.state';

@Component({
  selector: 'irl-component-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    title = 'Login below';

    authModel: Observable<AuthModel>;

    constructor(public authService: AuthService, store: Store<AppState>) {
        this.authModel = store.select(state => state.auth);
    }

    ngOnInit() {
        this.authService.checkToken();

        this.authModel.subscribe(x => console.log('app.component:authModel:next', x));
    }

}
