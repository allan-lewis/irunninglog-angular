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

const formatDate = D3.timeParse('%m-%d-%Y');

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
  private yScale;
  private yScale2;
  private xAxis;
  private yAxis;
  private yAxis2;
  private htmlElement: HTMLElement;
  private dimensions: any = {width: 0, height: 0};

  constructor() { }

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);

    this.margin = {top: 20, right: 50, bottom: 30, left: 50};

    this.width = this.htmlElement.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.htmlElement.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = D3.scaleTime().range([0, this.width]);
    this.yScale = D3.scaleLinear().range([this.height, 0]);
    this.yScale2 = D3.scaleLinear().range([this.height, 0]);
    this.buildChart();

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

  private buildChart() {
    this.xAxis = D3.axisBottom(this.xScale);
    this.yAxis = D3.axisLeft(this.yScale);
    this.yAxis2 = D3.axisRight(this.yScale2);

    this.host.html('');

    let self = this;

    let line = D3.line()
      .curve(D3.curveBasis)
      .x(function(d: any) { return self.xScale(formatDate(d.date)); })
      .y(function(d: any) { return self.yScale2(d.cumulative); });

    this.svg = this.host.append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    self.xScale.domain(D3.extent(this.dataSet.points, function(d: any) { return formatDate(d.date); }));
    self.yScale.domain(D3.extent(this.dataSet.points, function(d: any) { return d.monthly; }));
    self.yScale2.domain(D3.extent(this.dataSet.points, function(d: any) { return d.cumulative; }));

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

    self.svg.append('path')
        .datum(this.dataSet.points)
        .attr('class', 'line')
        .attr('d', line);
  }

}
