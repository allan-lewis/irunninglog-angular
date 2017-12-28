import { AfterViewInit, Component, Input, Inject, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PingModel } from '../state/ping.model'
import { PingService } from './ping.service';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'irl-component-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnChanges {

  mode = 'indeterminate';

  @Input()
  ping: PingModel;

  constructor(public snackBar: MatSnackBar) {

  }

  ngOnChanges(): void {
    // console.log('PingComponent:ngOnChanges');
  }

  openSnackBar() {
    this.snackBar.openFromComponent(PingStatusComponent, {
      duration: 2000,
      data: this.ping
    });
  }

  private status() {
    let val = this.ping.average;

    if (val <= 0) {
      return this.ping.status >= 300 ? 'bad' : 'none';
    } else if (val < 500) {
      return 'good';
    } else if (val < 1000) {
      return 'ok'
    } else {
      return 'bad';
    }
  }

  style() {
    switch(this.status()) {
      case 'ok' :
        return {'color': '#fdd835'};
      case 'good':
        return {'color': '#43a047'};
      default:
        return {'color': '#e53935'};
    }
  }

  tooltip() {
    switch(this.status()) {
      case 'ok' :
        return 'Poor Connection';
      case 'good':
        return 'Good Connection';
      default:
        return 'Bad Connection';
    }
  }

}

@Component({
  selector: 'irl-component-ping-status',
  template: `
    <div>
      <span class="status-label">Status:</span> <span class="status-value">{{data.status}}</span><span class="status-ms">ms</span>
      <span class="status-label">Avg:</span> <span class="status-value">{{data.average | number:'1.0-0' | comma}}</span><span class="status-ms">ms</span>
      <span class="status-label">Avg:</span> <span class="status-value">{{data.last | number:'1.0-0' | comma}}</span><span class="status-ms">ms</span>
      <span class="status-label">Avg:</span> <span class="status-value">{{data.min | number:'1.0-0' | comma}}</span><span class="status-ms">ms</span>
      <span class="status-label">Avg:</span> <span class="status-value">{{data.max | number:'1.0-0' | comma}}</span><span class="status-ms">ms</span>
    </div>
  `,
  styles: []
})
export class PingStatusComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
