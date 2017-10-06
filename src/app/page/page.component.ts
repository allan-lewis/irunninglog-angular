import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'irl-component-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    private chartData: Array<any>;

    ngOnInit() {
        setTimeout(() => {
          this.generateData();			    
        }, 1000);
    }

    generateData() {
        this.chartData = [
          ['Jan', 140],
          ['Feb', 161.1],
          ['Mar', 190.4],
          ['Apr', 200.8],
          ['May', 159.2],
          ['Jun', 153.3],
          ['Jul', 174.5],
          ['Aug', 222.4],
          ['Sep', 248.5]
        ];		     
    }

}
