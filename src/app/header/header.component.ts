import { Component, Input } from '@angular/core';
import { AuthenticationModel } from '../state/authentication.model';
import { ProfileService } from './profile.service';
import { ProfileModel } from '../state/profile.model';
import { PingModel } from '../state/ping.model';
import { PingService } from '../ping/ping.service';

@Component({
  selector: 'irl-component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    title = 'irunninglog';

    @Input() authenticationModel: AuthenticationModel;

    profile : ProfileModel;
    ping: PingModel;

    constructor(pingService: PingService, public profileService: ProfileService) {
        profileService.profile().subscribe(x => this.profile = x);

        pingService.ping().subscribe(x => this.ping = x);

        pingService.init();
        profileService.init();
    }

}
