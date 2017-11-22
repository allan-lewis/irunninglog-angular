import { Component, Input, OnChanges } from '@angular/core';
import { StreaksModel } from '../state/streaks.model';

@Component({
  selector: 'irl-component-streaks',
  templateUrl: './streaks.component.html',
  styleUrls: ['./streaks.component.css', '../progress/progress-cards.css']
})
export class StreaksComponent implements OnChanges {

  @Input()
  model: StreaksModel;

  ngOnChanges(): void {
    // console.log('StreaksComponent:ngOnChanges');
  }

}
