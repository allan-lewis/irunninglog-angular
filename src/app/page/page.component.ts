import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ChallengesModel } from '../state/challenges.model';
import { DataSet } from '../state/data-set.model';
import { ShoesModel } from '../state/shoes.model';
import { StreaksModel } from '../state/streaks.model';
import { YearlyTotalsModel } from '../state/yearly-total.model';
import { ChallengesService } from '../challenges/challenges.service';
import { ShoesService } from '../shoes/shoes.service';
import { StatisticsService } from '../statistics/statistics.service';
import { StreaksService } from '../streaks/streaks.service';

@Component({
  selector: 'irl-component-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  challenges: ChallengesModel;
  dataSet: DataSet;
  shoes: ShoesModel;
  streaks: StreaksModel;
  yearlyTotals: YearlyTotalsModel;

  constructor(challengesService: ChallengesService,
              statisticsService: StatisticsService,
              shoesService: ShoesService,
              streaksService: StreaksService,
              private store: Store<AppState>) {

    this.store.select(state => state.dataSet).filter(x => !!x).subscribe(x => this.dataSet = x);

    this.store.select(state => state.shoes).filter(x => !!x).subscribe(x => this.shoes = x);

    this.store.select(state => state.streaks).filter(x => !!x).subscribe(x => this.streaks = x);

    this.store.select(state => state.challenges).filter(x => !!x).subscribe(x => this.challenges = x);

    this.store.select(state => state.yearlyTotals).filter(x => !!x).subscribe(x => this.yearlyTotals = x);
  }

}
