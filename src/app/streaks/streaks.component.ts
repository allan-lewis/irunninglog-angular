import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StreaksModel } from '../state/streaks.model';
import { StreaksService } from './streaks.service';

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
