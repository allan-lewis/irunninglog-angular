import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StreaksModel } from '../state/streaks.model';

@Component({
  selector: 'irl-component-streaks',
  templateUrl: './streaks.component.html',
  styleUrls: ['./streaks.component.css']
})
export class StreaksComponent {

  model: StreaksModel;

  constructor(public store: Store<AppState>) {
    this.store.select(state => state.streaks).subscribe(x => this.model = x);
  }

}
