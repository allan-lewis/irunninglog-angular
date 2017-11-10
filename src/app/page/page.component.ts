import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { DataSet } from '../state/data-set.model';
import { ShoesModel } from '../state/shoes.model';
import { ShoesService } from '../shoes/shoes.service';
import { StatisticsService } from '../statistics/statistics.service';

@Component({
  selector: 'irl-component-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  dataSet: DataSet;
  shoes: ShoesModel;

  constructor(statisticsService: StatisticsService,
              shoesService: ShoesService,
              private store: Store<AppState>) {

    this.store.select(state => state.dataSet).filter(x => !!x).subscribe(x => this.dataSet = x);

    this.store.select(state => state.shoes).filter(x => !!x).subscribe(x => this.shoes = x);
  }

}
