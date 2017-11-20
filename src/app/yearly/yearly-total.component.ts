import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { YearlyTotalModel } from '../state/yearly-total.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StatisticsService } from '../statistics/statistics.service';
import * as d3 from 'd3';

@Component({
  selector: 'irl-component-yearly-total',
  templateUrl: './yearly-total.component.html',
  styleUrls: ['./yearly-total.component.css']
})
export class YearlyTotalComponent implements OnChanges {

  @Input() model : YearlyTotalModel;
  @ViewChild('chart') private chartContainer: ElementRef;

  ngOnChanges() {
    // console.log('YearlyTotalComponent:ngOnChanges');
    this.drawChart();
  }

  drawChart() {
      const element = this.chartContainer.nativeElement;

      const svg = d3.select(element).append('svg')		      
        .attr('width', element.offsetWidth)		      
        .attr('height', element.offsetHeight);

      const circle = svg.append('circle')
        .attr('cx', 50).attr('cy', 50)
        .attr('r', this.model.percentage / 2)
        .attr('style', 'fill: rgba(67,160,71, ' + (this.model.percentage / 100) + ')');
  }

}
