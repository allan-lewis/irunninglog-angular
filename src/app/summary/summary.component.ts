import { Component, OnInit } from '@angular/core';
import { SummaryModel } from '../state/summary.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StatisticsService } from '../statistics/statistics.service';

@Component({
  selector: 'irl-component-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary: SummaryModel;

  constructor(public service: StatisticsService, public store: Store<AppState>) {
    this.store.select(state => state.summary).subscribe(x => this.summary = x);
  }

  ngOnInit() {
    this.service.load();
  }

}
