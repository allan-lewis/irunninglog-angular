import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { DataPoint } from '../state/data-point.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import * as d3 from 'd3';

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
  private margin: any = { top: 32, bottom: 32, left: 32, right: 32};		  
  private chart: any;		  
  private width: number;		  
  private height: number;		  
  private xScale: any;		  
  private yScale: any;		  
  private colors: any;		  
  private xAxis: any;		  
  private yAxis: any;

  constructor(public store: Store<AppState>) { 
    this.store.select(state => state.dataPoints).filter(x => !!x).subscribe(x => {
      this.data = x;  

      if (this.chart) {	
        this.updateChart();
      }
    });
  }		

  ngOnInit() {		    
    this.createChart();		    
    if (this.data) {		      
      this.updateChart();		    
    }		  
  }

  ngOnChanges() {		    
    if (this.chart) {		      
      this.updateChart();		   
    }		  
  }

  private createChart() {
    const element = this.chartContainer.nativeElement;		    
    this.width = element.offsetWidth - this.margin.left - this.margin.right;		    
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;		    
    const svg = d3.select(element).append('svg')		      
      .attr('width', element.offsetWidth)		      
      .attr('height', element.offsetHeight);

    // chart plot area		    
    this.chart = svg.append('g')		      
      .attr('class', 'bars')		      
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);


    // define X & Y domains		    
    const xDomain = this.data.map(d => d['label']);		    
    const yDomain = [0, d3.max(this.data, d => d[1])];			

    // create scales		    
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);		    
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);		

    // bar colors		    
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);	

    // x & y axis		    
    this.xAxis = svg.append('g')		      
      .attr('class', 'axis axis-x')	
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)		      
      .call(d3.axisBottom(this.xScale));		    
      
    this.yAxis = svg.append('g')		      
      .attr('class', 'axis axis-y')		      
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)		      
      .call(d3.axisLeft(this.yScale));
  }

  private updateChart() {
      // update scales & axis		    
      this.xScale.domain(this.data.map(d => d['label']));		    
      this.yScale.domain([0, d3.max(this.data, d => d['value'])]);	
      this.colors.domain([0, this.data.length]);		    
      this.xAxis.transition().call(d3.axisBottom(this.xScale).tickValues(this.xScale.domain().filter(function(d, i) { return d.indexOf('Jan') >=0; })));		    
      this.yAxis.transition().call(d3.axisLeft(this.yScale));   
      
      const update = this.chart.selectAll('.bar')		      
        .data(this.data);		

      // remove exiting bars		    
      update.exit().remove();		
  
var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    
      // update existing bars		    
      this.chart.selectAll('.chart-bar').transition()		      
        .attr('x', d => this.xScale(d['label']))		      
        .attr('y', d => this.yScale(d['value']))		      
        .attr('width', d => this.xScale.bandwidth())		      
        .attr('height', d => this.height - this.yScale(d['value']));      
        // .style('fill', (d, i) => '#ff5722');
  

      // add new bars		   
      update.enter()		      
        .append('rect')		      
        .attr('class', 'chart-bar')		      
        .attr('x', d => this.xScale(d['label']))		      
        .attr('y', d => this.yScale(0))		      
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
        // .style('fill', '#ff5722')	
        .transition()		      
        .delay((d, i) => i * 10)        	      
        .attr('y', d => this.yScale(d['value']))		      
        .attr('height', d => this.height - this.yScale(d['value']));
  }

}
