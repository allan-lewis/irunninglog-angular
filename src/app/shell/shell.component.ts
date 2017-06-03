import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthenticationModel } from '../state/authentication.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'irl-component-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

    authenticationModel: AuthenticationModel;

    constructor(public authentciationService: AuthenticationService, store: Store<AppState>) {
        store.select(state => state.authentication).filter(x => x != null).subscribe(x => this.authenticationModel = x);
    }    
    
    ngOnInit() {
        let code = this.authentciationService.getCode();

        if (code) {
            this.authentciationService.login(code);
        } else {
            this.getCodeAndLogin();
        }
    }

    private getCodeAndLogin() {
        let code = this.getParameterByName('code', window.location.href);

        if (code) {
            let state = this.authentciationService.getState();
            if (state === this.getParameterByName('state', window.location.href)) {
                this.authentciationService.login(code);
            } else {
                this.authentciationService.logout();
            }
        } else {
            this.authentciationService.logout();
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
