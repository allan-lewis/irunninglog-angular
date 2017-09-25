import { Component } from '@angular/core';
import { ChallengesService } from './challenges.service';
import { ChallengeModel } from '../state/challenge.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Component({
  selector: 'irl-component-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css', '../progress/progress-cards.css']
})
export class ChallengesComponent {

  model: Array<ChallengeModel>;

  constructor(public store: Store<AppState>, service: ChallengesService) {
    this.store.select(state => state.challenges).filter(x => !!x).subscribe(x => this.model = x);
  }

}
