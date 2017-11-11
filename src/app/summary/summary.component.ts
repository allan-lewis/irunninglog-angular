import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { SummaryModel } from '../state/summary.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StatisticsService } from '../statistics/statistics.service';

@Component({
  selector: 'irl-component-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements AfterViewInit, OnChanges {

  @Input()
  summary: SummaryModel;

  constructor() {
    // console.log('SummaryComponent:constructor');
  }

  ngAfterViewInit(): void {
    // console.log('SummaryComponent:ngAfterViewInit');
  }

  ngOnChanges(): void {
    // console.log('SummaryComponent:ngOnChanges');
  }

}
