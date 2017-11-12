import { Component, Input, OnChanges } from '@angular/core';
import { ChallengesService } from './challenges.service';
import { ChallengesModel } from '../state/challenges.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Component({
  selector: 'irl-component-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css', '../progress/progress-cards.css']
})
export class ChallengesComponent implements OnChanges {

  @Input()
  model: ChallengesModel;

  ngOnChanges(): void {
    console.log('ChallengesComponent:ngOnChanges');
  }

}
