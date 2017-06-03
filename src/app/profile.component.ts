import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { AuthenticationModel } from './authentication/authentication.model';
import { ProfileModel } from './profile.model';

@Component({
  selector: 'irl-component-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    profile : Observable<ProfileModel>;

    constructor(public profileService: ProfileService, public store: Store<AppState>) { 
        this.profile = this.store.select(state => state.profile);
    }    

    ngOnInit() {
        this.store.select(state => state.authentication).filter(x => !!x.token).subscribe(x => this.profileService.load());
    }

}
