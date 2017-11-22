import { Component, Input, OnChanges } from '@angular/core';
import { ShoesModel } from '../state/shoes.model';

@Component({
  selector: 'irl-component-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css', '../progress/progress-cards.css']
})
export class ShoesComponent implements OnChanges {

  @Input()
  shoes: ShoesModel;

  ngOnChanges(): void {
    // console.log('ShoesComponent:ngOnChanges');
  }

}
