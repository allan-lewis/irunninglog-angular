import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { YearlyTotalsModel } from '../state/yearly-total.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StatisticsService } from '../statistics/statistics.service';

@Component({
  selector: 'irl-component-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.css']
})
export class YearlyComponent implements OnChanges {

  @Input()
  model: YearlyTotalsModel;

  ngOnChanges(): void {
    // console.log('YearlyComponent:ngOnChanges');
  }

}
