import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { ConfirmService } from '../confirm/confirm.service';

@Component({
  selector: 'irl-component-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

    constructor(public authenticationService : AuthenticationService, public confirmService: ConfirmService) {

    }

    logout() {
        this.confirmService.confirm('Are you sure?').filter(res => !!res).subscribe(res => this.authenticationService.logout());
    }

}
