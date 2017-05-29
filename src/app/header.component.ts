import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { AuthModel } from './auth.model';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';

@Component({
  selector: 'irl-component-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    
    title = 'irunninglog';

    authModel: Observable<AuthModel>;

    constructor(store: Store<AppState>) {
        this.authModel = store.select(state => state.auth);
    } 
     
}
