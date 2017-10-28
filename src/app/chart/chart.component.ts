import { Component, AfterViewInit, OnChanges, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import {DataSet} from '../state/data-set.model';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {Observable} from 'rxjs';
import * as d3 from 'd3';

@Component({
  selector: 'irl-component-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements AfterViewInit, OnChanges {  
  
  @Input()
  dataSet: DataSet;

  @ViewChild('chart')
  private chartContainer: ElementRef;

  private margin: any = {top: 40, bottom: 32, left: 32, right: 32};
  private width: number;
  private height: number;
  private xScale: any;
  private yScaleLeft: any;
  private yScaleRight: any;
  private xAxis: any;
  private yAxisLeft: any;
  private yAxisRight: any;
  private svg: any;
  private line: any;
  private chart: any;
  private dimensions: any = {width: 0, height: 0};
  private tooltip: any;

  constructor() { }

  ngAfterViewInit() {
    this.setupAxes();

    Observable.interval(100).subscribe((x) => {
      let width = this.chartContainer.nativeElement.offsetWidth;
      let height = this.chartContainer.nativeElement.offsetHeight;

      if (width != this.dimensions.width || height != this.dimensions.height) {
        this.dimensions.width = width;
        this.dimensions.height = height;

        d3.select(this.chartContainer.nativeElement).select("svg").remove();
        this.setupAxes();
        this.ngOnChanges();
      }
    });
  }

  ngOnChanges() {
    if (this.chartContainer) {
      // this.updateAxes();
      // this.drawBars();
    }
  }

  private setupAxes() {
    const element = this.chartContainer.nativeElement;

    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    this.chart = this.svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.width = element.offsetWidth - this.margin.left - this.margin.right - 8;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    const xDomain = [];
    const yDomainLeft = [0, d3.max(this.dataSet.points, d => d.monthly)];
    const yDomainRight = [0, d3.max(this.dataSet.points, d => d.cumulative)];

    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScaleLeft = d3.scaleLinear().domain(yDomainLeft).range([this.height, 0]);
    this.yScaleRight = d3.scaleLinear().domain(yDomainRight).range([this.height, 0]);

    this.xAxis = this.svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));

    this.yAxisLeft = this.svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScaleLeft));

    this.tooltip = d3.select("body").append("div").attr("class", "toolTip");

    // this.yAxisRight = this.svg.append('g')
    //   .attr('class', 'axis axis-y-right')
    //   .attr('transform', `translate(${this.width + this.margin.right}, ${this.margin.top})`)
    //   .call(d3.axisRight(this.yScaleRight))
    //   .text("Label");
  }

  private updateAxes() {
    const numTicks = Math.floor(this.width / 50);
    const factor = this.dataSet.points.length == 0 ? 0 : Math.floor(this.dataSet.points.length / numTicks) + 1;

    const tickFilter = function (d, i) {
      return i % factor == 0;
    };

    this.xScale.domain(this.dataSet.points.map(d => d.date));
    this.yScaleLeft.domain([0, d3.max(this.dataSet.points, d => d.monthly)]);
    this.yScaleRight.domain([0, d3.max(this.dataSet.points, d => d.cumulative)]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale).tickValues(this.xScale.domain().filter(tickFilter)));
    this.yAxisLeft.transition().call(d3.axisLeft(this.yScaleLeft));
    // this.yAxisRight.transition().call(d3.axisRight(this.yScaleRight));
  }

  private drawBars() {
    const update = this.chart.selectAll('.bar')
      .data(this.dataSet.points);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.chart-bar').transition()
      .attr('x', d => this.xScale(d['label']))
      .attr('y', d => this.yScaleLeft(d['value']))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScaleLeft(d['value']));

    let topp = this.chartContainer.nativeElement.offsetTop;
    var tt = this.tooltip;

    // add new bars
    update.enter()
      .append('rect')
      .attr('class', 'chart-bar')
      .attr('x', d => this.xScale(d['label']))
      .attr('y', d => this.yScaleLeft(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .on("mouseover", function () {
        tt.style("display", "inline-block");
      })
      .on("mouseout", function (d) {
        tt.style("display", "none");
      })
      .on("mousemove", function (d) {
        const x = this.x.baseVal.value + 32 - 40 + this.width.baseVal.value / 2;
        const y = this.y.baseVal.value;

        tt
          .style("left", x + "px")
          .style("top", topp + y + 4 + "px")
          .html('<div class="toolTipLabel">' + (d.label) + '</div><div class="toolTipValue">' + (d.value) + '</div>');
      })
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScaleLeft(d['value']))
      .attr('height', d => this.height - this.yScaleLeft(d['value']));
  }

}
