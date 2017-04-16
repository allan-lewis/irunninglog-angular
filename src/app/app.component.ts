import { Component } from '@angular/core';

import {Auth} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toolbarTitle = 'irunninglog';
  toolbarSubTitle = 'cuatro';
  title = 'app works!';

  constructor(public auth: Auth) {}

}

