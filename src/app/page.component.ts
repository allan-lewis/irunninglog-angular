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
        let code = this.loginService.getCode();

        if (code) {
            this.loginService.login(code);
        } else {
            this.getCodeAndLogin();
        }
    }

    private getCodeAndLogin() {
        let code = this.getParameterByName('code', window.location.href);

        if (code) {
            let state = this.loginService.getState();
            if (state === this.getParameterByName('state', window.location.href)) {
                this.loginService.login(code);
            } else {
                this.loginService.logout();
            }
        } else {
            this.loginService.logout();
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
