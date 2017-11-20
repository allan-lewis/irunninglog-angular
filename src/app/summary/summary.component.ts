import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { SummaryModel } from '../state/summary.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StatisticsService } from '../statistics/statistics.service';

@Component({
  selector: 'irl-component-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnChanges {

  @Input()
  model: SummaryModel;

  ngOnChanges(): void {
    // console.log('SummaryComponent:ngOnChanges');
  }

}
