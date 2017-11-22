import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { SummaryModel } from '../state/summary.model';

@Component({
  selector: 'irl-component-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnChanges {

  @Input()
  model: SummaryModel;

  ngOnChanges(): void {
    // console.log('SummaryComponent:ngOnChanges');
  }

}
