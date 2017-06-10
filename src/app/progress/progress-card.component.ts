import { Component, Input } from '@angular/core';

@Component({
  selector: 'irl-component-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.css']
})
export class ProgressCardComponent {

    @Input() model : any;

    style() {
        return 'progress-card-good';
    }

}
