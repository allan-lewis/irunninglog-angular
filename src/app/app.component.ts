import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import {AppState} from './app.state';
import {AuthModel} from './auth.model';

@Component({
  selector: 'irl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  toolbarTitle = 'irunninglog';
  toolbarSubTitle = 'cuatro';

  authModel: Observable<AuthModel>;

  constructor(public auth: AuthService, private store: Store<AppState>) {
    this.authModel = store.select(state => state.auth);
  }

  ngOnInit() {
    this.auth.checkToken();

    this.authModel.subscribe(x => console.log('app.component:authModel:next', x));
  }

}
