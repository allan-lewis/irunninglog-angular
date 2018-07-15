import { Component, ChangeDetectorRef } from '@angular/core';
import { ChallengesModel } from '../state/challenges.model';
import { DataSet } from '../state/data-set.model';
import { IProgressItem } from '../state/progress-item.model';
import { ShoesModel } from '../state/shoes.model';
import { StreaksModel } from '../state/streaks.model';
import { SummaryModel } from '../state/summary.model';
import { YearlyTotalsModel } from '../state/yearly-total.model';
import { StatisticsDateRange, THIS_YEAR } from '../state/statistics-date-range.model';
import { ChallengesService } from '../challenges/challenges.service';
import { ProgressListService } from '../progress/progress-list.service';
import { ShoesService } from '../shoes/shoes.service';
import { StatisticsService } from '../statistics/statistics.service';
import { StreaksService } from '../streaks/streaks.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

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
  summary: SummaryModel;
  dateRanges: StatisticsDateRange [];
  selectedStatisticsRange: string = THIS_YEAR.key; 

  progressList: Array<IProgressItem>;

  constructor(challengesService: ChallengesService,
              statisticsService: StatisticsService,
              shoesService: ShoesService,
              streaksService: StreaksService,
              progressListService: ProgressListService,
              public store: Store<AppState>) {


    shoesService.shoes().subscribe(x => this.shoes = x);

    streaksService.streaks().subscribe(x => this.streaks = x);

    challengesService.challenges().subscribe(x => this.challenges = x);
    
    statisticsService.dataSet().subscribe(x => this.dataSet = x);

    statisticsService.yearlyTotals().subscribe(x => this.yearlyTotals = x);

    statisticsService.summary().subscribe(x => this.summary = x);

    statisticsService.dateRanges().subscribe(x => this.dateRanges = x);

    statisticsService.selectedDateRange().subscribe(x => this.selectedStatisticsRange = x.key);

    progressListService.progressList().subscribe(x => this.progressList = x);

    statisticsService.init();
    challengesService.init();
    shoesService.init();
    streaksService.init();
  }

}
