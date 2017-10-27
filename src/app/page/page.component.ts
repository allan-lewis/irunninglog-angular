import { Component } from '@angular/core';
import { StatisticsService } from '../statistics/statistics.service';
import { DataSet } from '../state/data-set.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Component({
  selector: 'irl-component-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  dataSet: DataSet;

  constructor(private statisticsService: StatisticsService, private store: Store<AppState>) {
    this.store.select(state => state.dataSet).filter(x => !!x).subscribe(x => {
      this.dataSet = x;
    });
  }

}
