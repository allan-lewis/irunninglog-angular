import { Component, OnChanges, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { YearlyTotalModel } from '../state/yearly-total.model';
import * as d3 from 'd3';

@Component({
  selector: 'irl-component-yearly-total',
  templateUrl: './yearly-total.component.html',
  styleUrls: ['./yearly-total.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class YearlyTotalComponent implements OnChanges {

  @Input() model: YearlyTotalModel;
  @ViewChild('chart') private chartContainer: ElementRef;

  ngOnChanges() {
    // console.log('YearlyTotalComponent:ngOnChanges');
    this.drawChart();
  }

  drawChart() {
    const element = this.chartContainer.nativeElement;

    var w = element.offsetWidth, h = element.offsetHeight;

    const svg = d3.select(element).append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('class', 'shadow')
      .append('g')
      .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

    var outerRadius = (w / 2) - 10;
    var innerRadius = outerRadius - 8;

    var color = ['#ec1561', '#2a3a46', '#202b33'];

    var arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    var arcLine = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0);

    var path = svg.append('path')
      .attr('d', arc)
      .attr('style', 'fill: #eee');

    var pathForeground = svg.append('path')
      .datum({ endAngle: (this.model.percentage / 100) * (2 * Math.PI) })
      .attr('d', arcLine)
      .attr('style', 'fill: #ff5722');
  }

}
