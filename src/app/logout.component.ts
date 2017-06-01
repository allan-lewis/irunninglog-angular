import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { AuthModel } from './auth.model';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { LoginService } from './login.service';
import { DialogService } from './dialog.service';

@Component({
  selector: 'irl-component-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

    constructor(public loginService : LoginService, public dialogService: DialogService) {

    }

    logout() {
        this.dialogService.confirm('Are you sure?')
      .filter(res => !!res).subscribe(res => this.loginService.logout());
    }

}
