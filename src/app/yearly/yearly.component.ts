import { Component, OnInit } from '@angular/core';
import { YearlyTotalModel } from '../state/yearly-total.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StatisticsService } from '../statistics/statistics.service';

@Component({
  selector: 'irl-component-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.css']
})
export class YearlyComponent {

  model: Array<YearlyTotalModel>;

  constructor(public service: StatisticsService, public store: Store<AppState>) {
    this.store.select(state => state.yearlyTotals).subscribe(x => this.model = x);
  }

}
