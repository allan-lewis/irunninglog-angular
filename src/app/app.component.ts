import {Component, OnInit} from '@angular/core';
import {Auth} from './auth.service';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import {AppState} from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  toolbarTitle = 'irunninglog';
  toolbarSubTitle = 'cuatro!';
  username: Observable<string>;

  constructor(public auth: Auth, private store: Store<AppState>) {
    this.username = store.select(state => state.username);
  }

  ngOnInit() {
    this.auth.checkToken();
  }

}
