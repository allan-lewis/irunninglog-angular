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

        var d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        sessionStorage.setItem('strava_state', uuid);
        window.location.href = 'https://www.strava.com/oauth/authorize?client_id=17706&response_type=code&redirect_uri=' + window.location.protocol + '//' + window.location.host + '&state=' + uuid;
    }

    private getCodeAndLogin() {
        let code = this.getParameterByName('code', window.location.href);
        
        console.log('login.component:getCodeAndLogin', !!code);

        if (code) {
            let state = sessionStorage.getItem('strava_state');
            if (state === this.getParameterByName('state', window.location.href)) {
                localStorage.setItem('strava_code', code);
                this.loginService.login(code);
            } else {
                this.loginService.unauthenticated();
            }
        } else {
            this.loginService.unauthenticated();
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
