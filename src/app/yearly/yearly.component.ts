import { Component, OnInit } from '@angular/core';
import { SummaryModel } from '../state/summary.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StatisticsService } from '../statistics/statistics.service';

@Component({
  selector: 'irl-component-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.css']
})
export class YearlyComponent {

  summary: SummaryModel;

  constructor(public service: StatisticsService, public store: Store<AppState>) {
    this.store.select(state => state.summary).subscribe(x => this.summary = x);
  }

}
