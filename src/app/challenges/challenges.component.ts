import { Component, Input, OnChanges } from '@angular/core';
import { ChallengesService } from './challenges.service';
import { ChallengesModel } from '../state/challenges.model';

@Component({
  selector: 'irl-component-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css', '../progress/progress-cards.css']
})
export class ChallengesComponent implements OnChanges {

  @Input()
  model: ChallengesModel;

  ngOnChanges(): void {
    // console.log('ChallengesComponent:ngOnChanges');
  }

}
