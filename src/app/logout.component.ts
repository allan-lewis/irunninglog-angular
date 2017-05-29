import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { AuthModel } from './auth.model';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { LoginService } from './login.service';

@Component({
  selector: 'irl-component-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

    constructor(public loginService : LoginService) {

    }

    logout() {
        this.loginService.logout();
    }

}
