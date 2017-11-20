import { Component, Input, OnChanges } from '@angular/core';
import { IProgressItem } from '../state/progress-item.model';

@Component({
  selector: 'irl-component-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.css']
})
export class ProgressListComponent implements OnChanges {

    @Input() model : Array<IProgressItem>;

    ngOnChanges() {
      console.log('ProgressListComponent:ngOnChanges', this.model);
    }

}
