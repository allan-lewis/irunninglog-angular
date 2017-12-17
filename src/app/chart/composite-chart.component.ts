import { AfterViewInit, ElementRef, Component, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as D3 from 'd3';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { DataPoint } from '../state/data-point.model';
import { DataSet } from '../state/data-set.model';

@Component({
  selector: 'irl-component-composite-chart',
  templateUrl: './composite-chart.component.html',
  styleUrls: ['./composite-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompositeChartComponent implements OnChanges, AfterViewInit {

  @Input()
  model: DataSet;

  @ViewChild('container')
  element: ElementRef;

  private htmlElement: HTMLElement;
  private host: any;
  private margin: any;
  private dimensions: any;
  private tooltip: any;

  ngAfterViewInit(): void {
    // console.log('CompositeChartComponent:ngAfterViewInit');

    this.htmlElement = this.element.nativeElement;

    this.host = D3.select(this.htmlElement);

    this.margin = { top: 40, right: 32, bottom: 30, left: 32 };

    this.drawChart();

    let self = this;

    Observable.interval(100).subscribe((x) => {
      if (!self.dimensions) {
        self.dimensions = { width: this.htmlElement.offsetWidth, height: this.htmlElement.offsetHeight };
      } else if (self.dimensions.width != this.htmlElement.offsetWidth || self.dimensions.height != this.htmlElement.offsetHeight) {
        self.dimensions = { width: this.htmlElement.offsetWidth, height: this.htmlElement.offsetHeight };

        self.drawChart();
      }
    });
  }

  ngOnChanges(): void {
    // console.log('CompositeChartComponent:ngOnChanges');

    this.drawChart();
  }

  private drawChart(): void {
    if (this.model.points.length > 0) {
      this.doDrawChart();
    }
  }

  private doDrawChart(): void {
    this.host.html('');

    this.tooltip = D3.select("body").append("div").attr("class", "toolTip");

    let width = this.htmlElement.offsetWidth - this.margin.left - this.margin.right;
    let height = this.htmlElement.offsetHeight - this.margin.top - this.margin.bottom;

    let svg = this.host.append('svg')
      .attr('width', width + this.margin.left + this.margin.right)
      .attr('height', height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    let xScaleMonthly = D3.scaleBand().padding(0.1).align(.5).domain([]).round(false).range([1, width]);

    let yScaleLeft = D3.scaleLinear().range([height, 0]);
    let yScaleRight = D3.scaleLinear().range([height, 0]);

    let self = this;

    xScaleMonthly.domain(this.model.points.map(d => this.formatDate(d.date)));
    yScaleLeft.domain([0, D3.max(this.model.points, d => d.monthly)]);
    yScaleRight.domain([0, D3.max(this.model.points, d => d.cumulative)]);

    this.drawXAxis(svg, xScaleMonthly, width, height);

    this.drawYAxes(svg, yScaleLeft, yScaleRight, width);

    this.drawBars(svg, xScaleMonthly, yScaleLeft, height);

    let factor = xScaleMonthly.bandwidth() / 2;
    let xScaleCumulative = D3.scaleTime().range([factor, width - factor]);
    xScaleCumulative.domain(D3.extent(this.model.points, function (d: any) { return self.parseDate(d.date); }));

    this.drawLine(svg, xScaleCumulative, yScaleRight);

    this.drawDots(svg, xScaleMonthly, yScaleRight);
  }

  private drawXAxis(svg: any, scale: any, width: number, height: number): void {
    const numTicks = Math.floor(width / 50);
    const factor = this.model.points.length == 0 ? 0 : Math.floor(this.model.points.length / numTicks) + 1;

    const tickFilter = function (d, i) {
      return i % factor == 0;
    };

    let xAxis = D3.axisBottom(scale).tickValues(scale.domain().filter(tickFilter));

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);
  }

  private drawYAxes(svg: any, scaleLeft: any, scaleRight: any, width: number): void {
    let yAxisLeft = D3.axisLeft(scaleLeft);
    let yAxisRight = D3.axisRight(scaleRight).tickFormat(D3.format(".0s"));

    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${width}, 0)`)
      .call(yAxisRight)
      .append('text')
      .attr('y', -12)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Total miles');

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxisLeft)
      .append('text')
      .attr('y', -12)
      .attr('x', 71)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Miles per month');
  }

  private drawBars(svg: any, xScale: any, yScale: any, height: number): void {
    let chart = svg.append('g')
      .attr('class', 'bars');

    const update = chart.selectAll('.chart-bar')
      .data(this.model.points);

    update.exit().remove();

    chart.selectAll('.chart-bar').transition()
      .attr('x', d => xScale(this.formatDate(d.date)))
      .attr('y', d => yScale(d.monthly))
      .attr('width', d => xScale.bandwidth())
      .attr('height', d => height - yScale(d.monthly));

    let self = this;

    update.enter()
      .append('rect')
      .attr('class', 'chart-bar')
      .attr('x', d => xScale(this.formatDate(d.date)))
      .attr('y', d => yScale(0))
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .on("mouseover", function () {
        self.tooltip.style("display", "inline-block");
      })
      .on("mouseout", function (d) {
        self.tooltip.style("display", "none");
      })
      .on("mousemove", function (d) {
        let x = this.x.baseVal.value + self.margin.left + this.width.baseVal.value / 2;
        let y = this.y.baseVal.value;
        // const topp = self.element.nativeElement.offsetTop;

        x = self.fixXPosition(x);
        y = self.fixYPosition(y, 0);

        self.tooltip
          .style("left", x - 30 + "px")
          .style("top", y + "px")
          .html('<div class="toolTipLabel">' + (self.formatDate(d.date)) + '</div><div class="toolTipValue">' + (d.monthlyFormatted) + '</div>');
      })
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => yScale(d.monthly))
      .attr('height', d => height - yScale(d.monthly));
  }

  private drawLine(svg: any, xScale: any, yScale: any): void {
    let self = this;

    let line = D3.line()
      .curve(D3.curveBasis)
      .x(function (d: any) { return xScale(self.parseDate(d.date)); })
      .y(function (d: any) { return yScale(d.cumulative); });

    svg.append('path')
      .datum(this.model.points)
      .attr('class', 'line')
      .attr('d', line);
  }

  private drawDots(svg: any, xScale: any, yScale: any) {
    let self = this;

    svg.selectAll(".dot")
      .data(this.model.points)
      .enter()
      .append("circle") // Uses the enter().append() method      
      .on("mousemove", function (d) {
        let x = this.cx.baseVal.value + self.margin.left;
        let y = this.cy.baseVal.value;

        x = self.fixXPosition(x);
        y = self.fixYPosition(y, 4);

        self.tooltip
          .style("left", x - 30 + "px")
          .style("top", y + "px")
          .html('<div class="toolTipLabel">' + (self.formatDate(d.date)) + '</div><div class="toolTipValue">' + (d.monthlyFormatted) + '</div>');
      })
      .on("mouseover", function () {
        self.tooltip.style("display", "inline-block");
      })
      .on("mouseout", function (d) {
        self.tooltip.style("display", "none");
      })
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function (d, i) { return xScale(self.formatDate(d.date)) + xScale.bandwidth() / 2 })
      .attr("cy", function (d) { return yScale(d.cumulative) })
      .attr("r", 5);
  }

  private parseDate(string: string): Date {
    return D3.timeParse('%m-%d-%Y')(string);
  }

  private formatDate(string: string): string {
    return moment(string, 'MM-DD-YYYY').format('MMM \'YY');
  }

  private fixXPosition(x: number): number {
      if (x + 30 > this.htmlElement.offsetWidth - 24) {
        x = this.htmlElement.offsetWidth - 54;
      } else if (x - 30 < 24) {
        x = 54;
      }

      return x;
  }

  private fixYPosition(y: number, offset: number): number {
      return Math.max(this.element.nativeElement.offsetTop, this.element.nativeElement.offsetTop + y - offset);
  }

}
