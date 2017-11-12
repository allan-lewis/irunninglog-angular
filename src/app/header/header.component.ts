import { Component, Input } from '@angular/core';
import { AuthenticationModel } from '../state/authentication.model';
import { ProfileService } from './profile.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
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

    constructor(public profileService: ProfileService, public store: Store<AppState>) { 
        this.store.select(state => state.profile).filter(x => !!x).subscribe(x => this.profile = x);
    }    
     
}
