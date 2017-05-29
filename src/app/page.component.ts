import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthModel } from './auth.model';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { LoginService } from './login.service';

@Component({
  selector: 'irl-component-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    authModel: Observable<AuthModel>;

    constructor(public loginService: LoginService, store: Store<AppState>) {
        this.authModel = store.select(state => state.auth);
    }    
    
    ngOnInit() {
        let code = localStorage.getItem('strava_code');

        if (code) {
            this.loginService.login(code);
        } else {
            this.getCodeAndLogin();
        }
    }

    private getCodeAndLogin() {
        let code = this.getParameterByName('code', window.location.href);

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
