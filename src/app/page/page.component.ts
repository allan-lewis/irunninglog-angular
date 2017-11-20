import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ChallengesModel } from '../state/challenges.model';
import { DataSet } from '../state/data-set.model';
import { PingModel } from '../state/ping.model';
import { IProgressItem } from '../state/progress-item.model';
import { ShoesModel } from '../state/shoes.model';
import { StreaksModel } from '../state/streaks.model';
import { SummaryModel } from '../state/summary.model';
import { YearlyTotalsModel } from '../state/yearly-total.model';
import { ChallengesService } from '../challenges/challenges.service';
import { PingService } from '../ping/ping.service';
import { ProgressListService } from '../progress/progress-list.service';
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
  ping: PingModel;
  shoes: ShoesModel;
  streaks: StreaksModel;
  yearlyTotals: YearlyTotalsModel;
  summary: SummaryModel;

  progressList: Array<IProgressItem>;

  constructor(challengesService: ChallengesService,
              pingService: PingService,
              statisticsService: StatisticsService,
              shoesService: ShoesService,
              streaksService: StreaksService,
              progressListService: ProgressListService,
              private store: Store<AppState>) {

    this.store.select(state => state.dataSet).filter(x => !!x).subscribe(x => this.dataSet = x);

    this.store.select(state => state.shoes).filter(x => !!x).subscribe(x => this.shoes = x);

    this.store.select(state => state.streaks).filter(x => !!x).subscribe(x => this.streaks = x);

    this.store.select(state => state.challenges).filter(x => !!x).subscribe(x => this.challenges = x);

    this.store.select(state => state.yearlyTotals).filter(x => !!x).subscribe(x => this.yearlyTotals = x);

    this.store.select(state => state.summary).filter(x => !!x).subscribe(x => this.summary = x);

    this.store.select(state => state.ping).filter(x => !!x).subscribe(x => this.ping = x);

    progressListService.progressList().subscribe(x => this.progressList = x);
  }

}
