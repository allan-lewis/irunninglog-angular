import { Component, OnInit } from '@angular/core';
import { AuthenticationModel } from '../state/authentication.model';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'irl-component-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

    authenticationModel: AuthenticationModel;

    constructor(public authenticationService: AuthenticationService) {
        authenticationService.authenticationModel().subscribe(x => this.authenticationModel = x);
    }    
    
    ngOnInit() {
        let code = this.authenticationService.getCode();

        if (code) {
            this.authenticationService.login(code);
        } else {
            this.getCodeAndLogin();
        }
    }

    private getCodeAndLogin() {
        let code = this.getParameterByName('code', window.location.href);

        if (code) {
            let state = this.authenticationService.getState();
            if (state === this.getParameterByName('state', window.location.href)) {
                this.authenticationService.login(code);
            } else {
                this.authenticationService.logout();
            }
        } else {
            this.authenticationService.logout();
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
