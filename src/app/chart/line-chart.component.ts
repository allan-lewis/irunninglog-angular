import {
  Component,
  OnChanges,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  Input
 } from '@angular/core';
import { DataPoint } from '../state/data-point.model';
import { DataSet } from '../state/data-set.model';
import { Observable } from 'rxjs';

import * as D3 from 'd3';
import * as moment from 'moment';

// const formatDate = D3.timeParse('%m-%d-%Y');

@Component({
  selector: 'irl-component-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnChanges, AfterViewInit {

  @Input()
  dataSet: DataSet;

  @ViewChild('container') 
  element: ElementRef;

  private host;
  private svg;
  private margin;
  private width;
  private height;
  private xScale;
  private xScale2;
  private yScale;
  private yScale2;
  private xAxis;
  private yAxis;
  private yAxis2;
  private htmlElement: HTMLElement;
  private dimensions: any = {width: 0, height: 0};
  private chart: any;

  constructor() { }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);

    this.margin = {top: 20, right: 50, bottom: 30, left: 50};

    Observable.interval(100).subscribe((x) => {
      let width = this.htmlElement.offsetWidth - this.margin.left - this.margin.right;
      let height = this.htmlElement.offsetHeight - this.margin.top - this.margin.bottom;

      if (width != this.dimensions.width || height != this.dimensions.height) {
        this.dimensions.width = width;
        this.dimensions.height = height;
        this.buildChart();
      }
    });
  }

  ngOnChanges(): void {
    if (this.htmlElement) {
      this.buildChart();
    }
  }

  private formatDate(string: String) {
    return moment(string, 'MM-DD-YYYY').format('MMM \'YY');
  }

  // TODO - Split this up
  private buildChart() {
    const numTicks = Math.floor(this.width / 50);
    const factor = this.dataSet.points.length == 0 ? 0 : Math.floor(this.dataSet.points.length / numTicks) + 1;

    const tickFilter = function (d, i) {
      return i % factor == 0;
    };

    this.width = this.htmlElement.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.htmlElement.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = D3.scaleTime().range([0, this.width]);
    this.xScale2 = D3.scaleBand().padding(0.1).align(.5).domain([]).round(false).range([1, this.width]);
    this.yScale = D3.scaleLinear().range([this.height, 0]);
    this.yScale2 = D3.scaleLinear().range([this.height, 0]);

    this.yAxis = D3.axisLeft(this.yScale);
    this.yAxis2 = D3.axisRight(this.yScale2);

    this.host.html('');

    let self = this;

    let line = D3.line()
      .curve(D3.curveBasis)
      .x(function(d: any) { return self.xScale(D3.timeParse('%m-%d-%Y')(d.date)); })
      .y(function(d: any) { return self.yScale2(d.cumulative); });

    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    self.xScale2.domain(this.dataSet.points.map(d => this.formatDate(d.date)));
    self.xScale.domain(D3.extent(this.dataSet.points, function(d: any) { return D3.timeParse('%m-%d-%Y')(d.date); }));
    self.yScale.domain([0, D3.max(this.dataSet.points, d => d.monthly)]);
    self.yScale2.domain([0, D3.max(this.dataSet.points, d => d.cumulative)]);

    this.xAxis = D3.axisBottom(this.xScale2).tickValues(this.xScale2.domain().filter(tickFilter));

    self.svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + self.height + ')')
        .call(self.xAxis);

    self.svg.append('g')
        .attr('class', 'y axis')
        .call(self.yAxis)
        .append('text')
        .attr('y', -12)
        .attr('x', 71)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Miles per month');

    self.svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${self.width}, 0)`)
        .call(self.yAxis2)
        .append('text')
        .attr('y', -12)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Total miles');

    this.chart = this.svg.append('g')
      .attr('class', 'bars');

    const update = this.chart.selectAll('.chart-bar')
      .data(this.dataSet.points);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.chart-bar').transition()
      .attr('x', d => this.xScale2(this.formatDate(d.date)))
      .attr('y', d => this.yScale(d.monthly))
      .attr('width', d => this.xScale2.bandwidth())
      .attr('height', d => this.height - this.yScale(d.monthly));

    // add new bars
    update.enter()
      .append('rect')
      .attr('class', 'chart-bar')
      .attr('x', d => self.xScale2(this.formatDate(d.date)))
      .attr('y', d => self.yScale(0))
      .attr('width', self.xScale2.bandwidth())
      .attr('height', 0)
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => self.yScale(d.monthly))
      .attr('height', d => self.height - self.yScale(d.monthly));

    self.svg.append('path')
        .datum(this.dataSet.points)
        .attr('class', 'line')
        .attr('d', line);
  }

}
