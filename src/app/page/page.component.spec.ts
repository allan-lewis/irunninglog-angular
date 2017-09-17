import { async, fakeAsync, tick, TestBed, inject} from '@angular/core/testing';
import { PageComponent } from './page.component';
import { ChartComponent } from '../chart/chart.component';
import { ChallengesComponent } from '../challenges/challenges.component';
import { ChallengesService } from '../challenges/challenges.service';
import { ShoesComponent } from '../shoes/shoes.component';
import { ShoesService } from '../shoes/shoes.service';
import { StreaksComponent } from '../streaks/streaks.component';
import { YearlyComponent } from '../yearly/yearly.component';
import { YearlyTotalComponent } from '../yearly/yearly-total.component';
import { StreaksService } from '../streaks/streaks.service';
import { PingComponent, PingGoodComponent, PingBadComponent } from '../ping/ping.component';
import { PingService } from '../ping/ping.service';
import { ProgressCardComponent } from '../progress/progress-card.component';
import { CommaSeparatedNumberPipe } from '../pipe/comma.pipe';
import { MdToolbarModule, MdCardModule, MdButtonModule, MdProgressBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { authenticationModelReducer } from '../state/authentication.reducer';
import { AuthenticationModel } from '../state/authentication.model';
import { profileModelReducer } from '../state/profile.reducer';
import { HttpModule, Http, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { SummaryComponent } from '../summary/summary.component';
import { StatisticsService } from '../statistics/statistics.service';

describe('PageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        HttpModule,
        MdCardModule,
        MdProgressBarModule,
        StoreModule.provideStore({
          auth: authenticationModelReducer,
          profile: profileModelReducer
        })
      ],
      declarations: [
        PageComponent,
        ChartComponent,
        ShoesComponent,
        StreaksComponent,
        PingComponent,
        PingGoodComponent,
        PingBadComponent,
        ChallengesComponent,
        ProgressCardComponent,
        CommaSeparatedNumberPipe,
        SummaryComponent,
        YearlyComponent,
        YearlyTotalComponent
      ],
      providers: [
          PingService,
          StreaksService,
          ShoesService,
          ChallengesService,
          StatisticsService,
            {
                provide: XHRBackend,
                useClass: MockBackend
            }
      ]
    }).compileComponents();
  }));

 it('should load the page component successfully', fakeAsync(
    inject([
      XHRBackend,
      PingService,
      ChallengesService,
      StreaksService,
      ShoesService,
      StatisticsService
    ], (mockBackend, ping: PingService, challenges: ChallengesService, streaks: StreaksService, shoes: ShoesService, stats: StatisticsService) => {
        ping.repeating = false;
        challenges.repeating = false;
        streaks.repeating = false;
        shoes.repeating = false;
        stats.repeating = false;

        const fixture = TestBed.createComponent(PageComponent);
        expect(fixture.componentInstance).not.toBeNull();
    })
  ));

});