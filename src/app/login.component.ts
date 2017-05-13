import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
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

    constructor(public loginService: LoginService, store: Store<AppState>) {
        this.authModel = store.select(state => state.auth);
    }

    ngOnInit() {
        this.authModel.subscribe(x => console.log('login.component:authModel:next', x));

        let code = localStorage.getItem('strava_code');
        console.log('login.component:ngOnInit', !!code);

        if (code) {
            this.loginService.login(code);
        } else {
            this.getCodeAndLogin();
        }
    }

    login() {
        console.log('login.component:login', window.location.protocol, window.location.host);

        // TODO - Add some state
        window.location.href = 'https://www.strava.com/oauth/authorize?client_id=17706&response_type=code&redirect_uri=' + window.location.protocol + '//' + window.location.host;
    }

    private getCodeAndLogin() {
        let code = this.getParameterByName('code', window.location.href);
        
        console.log('login.component:getCodeAndLogin', !!code);

        if (code) {
            // TODO - Validate state
            localStorage.setItem('strava_code', code);
            this.loginService.login(code);
        }
    }

    private getParameterByName(name: string, url: string) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

}
