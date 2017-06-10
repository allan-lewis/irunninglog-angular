import { Component, Input } from '@angular/core';

@Component({
  selector: 'irl-component-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.css']
})
export class ProgressCardComponent {

    @Input() model : any;

    style() {
        switch (this.model['progress']) {
            case 'GOOD':
                return 'progress-card-good';
            case 'OK':
                return 'progress-card-ok';
            case 'BAD':
                return 'progress-card-bad';
            default:
                return 'progress-card-none';
        }
    }

    color() {
        switch (this.model['progress']) {
            case 'GOOD':
                return 'primary';
            case 'OK':
                return 'accent';
            case 'BAD':
                return 'warn';
            default:
                return 'primary';
        }
    }

}
