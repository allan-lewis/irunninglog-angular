import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { DataPoint } from '../state/data-point.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
import * as d3 from 'd3';
import * as d3Shape from "d3-shape";

@Component({
  selector: 'irl-component-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],		  
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit, OnChanges {
		
  @ViewChild('chart') 
  private chartContainer: ElementRef;  

  private data: Array<DataPoint> = [];  
  private totals: Array<DataPoint> = [];

  private margin: any = { top: 32, bottom: 32, left: 32, right: 32};		  
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
  
  constructor(public store: Store<AppState>) { 
    this.store.select(state => state.dataPoints).filter(x => !!x).subscribe(x => {
      this.data = x[0];  
      this.totals = x[1];

      if (this.data.length > 0 && this.totals.length > 0) {
        this.ngOnChanges();
      }
    });
  }

  ngOnInit() {
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
    this.updateAxes();
    this.drawBars();
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

    const xDomain = this.data.map(d => d['label']);		    
    const yDomainLeft = [0, d3.max(this.data, d => d[1])];	
    const yDomainRight = [0, d3.max(this.totals, d => d[1])];	

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
      
    // this.yAxisRight = this.svg.append('g')		      
    //   .attr('class', 'axis axis-y-right')		      
    //   .attr('transform', `translate(${this.width + this.margin.right}, ${this.margin.top})`)		      
    //   .call(d3.axisRight(this.yScaleRight))
    //   .text("Label");	
  }

  private updateAxes() {
      const numTicks =  Math.floor(this.width / 50);
      const factor = this.data.length == 0 ? 0 : Math.floor(this.data.length / numTicks) + 1;

      const tickFilter = function(d, i) { return i % factor == 0;};

      this.xScale.domain(this.data.map(d => d['label']));		    
      this.yScaleLeft.domain([0, d3.max(this.data, d => d['value'])]);	
      this.yScaleRight.domain([0, d3.max(this.totals, d => d['value'])]);		    
      this.xAxis.transition().call(d3.axisBottom(this.xScale).tickValues(this.xScale.domain().filter(tickFilter)));		    
      this.yAxisLeft.transition().call(d3.axisLeft(this.yScaleLeft));   
      // this.yAxisRight.transition().call(d3.axisRight(this.yScaleRight));   
  }

  private drawBars() {
      const update = this.chart.selectAll('.bar')		      
        .data(this.data);		

      // remove exiting bars		    
      update.exit().remove();		
    
      // update existing bars		    
      this.chart.selectAll('.chart-bar').transition()		      
        .attr('x', d => this.xScale(d['label']))		      
        .attr('y', d => this.yScaleLeft(d['value']))		      
        .attr('width', d => this.xScale.bandwidth())		      
        .attr('height', d => this.height - this.yScaleLeft(d['value']));  
  
      var tooltip = d3.select("body").append("div").attr("class", "toolTip");

      // add new bars		   
      update.enter()		      
        .append('rect')		      
        .attr('class', 'chart-bar')		      
        .attr('x', d => this.xScale(d['label']))		      
        .attr('y', d => this.yScaleLeft(0))		      
        .attr('width', this.xScale.bandwidth())		      
        .attr('height', 0)		      
                .on("mouseover", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.label) + ": " + (d.value));
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");})	
        .transition()		      
        .delay((d, i) => i * 10)        	      
        .attr('y', d => this.yScaleLeft(d['value']))		      
        .attr('height', d => this.height - this.yScaleLeft(d['value']));
  }

}
