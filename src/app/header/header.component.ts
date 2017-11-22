import { Component, Input } from '@angular/core';
import { AuthenticationModel } from '../state/authentication.model';
import { ProfileService } from './profile.service';
import { ProfileModel } from '../state/profile.model';

@Component({
  selector: 'irl-component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    title = 'irunninglog';

    @Input() authenticationModel: AuthenticationModel;

    profile : ProfileModel;

    constructor(public profileService: ProfileService) {
        profileService.profile().subscribe(x => this.profile = x);
    }

}
