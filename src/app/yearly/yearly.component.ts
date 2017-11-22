import { Component, Input, OnChanges } from '@angular/core';
import { YearlyTotalsModel } from '../state/yearly-total.model';

@Component({
  selector: 'irl-component-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.css']
})
export class YearlyComponent implements OnChanges {

  @Input()
  model: YearlyTotalsModel;

  ngOnChanges(): void {
    // console.log('YearlyComponent:ngOnChanges');
  }

}
