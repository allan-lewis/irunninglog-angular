import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StreaksModel } from '../state/streaks.model';
import { StreaksService } from './streaks.service';

@Component({
  selector: 'irl-component-streaks',
  templateUrl: './streaks.component.html',
  styleUrls: ['./streaks.component.css', '../progress/progress-cards.css']
})
export class StreaksComponent {

  model: StreaksModel;

  constructor(public store: Store<AppState>, public streaksService: StreaksService) {
    this.store.select(state => state.streaks).filter(x => !!x).subscribe(x => this.model = x);
  }

}
