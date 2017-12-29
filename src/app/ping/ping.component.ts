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
      duration: 5000,
      data: this.ping
    });
  }

  private status() {
    let val = this.ping.average;

    if (val <= 0) {
      return 'bad';
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
      <span class="status-label">Status:</span> <span class="status-value" [ngClass]="style()">{{data.status}}</span>
      <span class="status-label" *ngIf="!error()">Avg:</span> <span class="status-value" [ngClass]="style()" *ngIf="!error()">{{data.average | number:'1.0-0' | comma}}</span><span class="status-ms" *ngIf="!error()">ms</span>
      <span class="status-label">Last:</span> <span class="status-value" [ngClass]="style()">{{data.last | number:'1.0-0' | comma}}</span><span class="status-ms">ms</span>
      <span class="status-label" *ngIf="!error()">Min:</span> <span class="status-value" [ngClass]="style()" *ngIf="!error()">{{data.min | number:'1.0-0' | comma}}</span><span class="status-ms" *ngIf="!error()">ms</span>
      <span class="status-label" *ngIf="!error()">Max:</span> <span class="status-value" [ngClass]="style()" *ngIf="!error()">{{data.max | number:'1.0-0' | comma}}</span><span class="status-ms" *ngIf="!error()">ms</span>
    </div>
  `,
  styleUrls: ['./ping.component.css']
})
export class PingStatusComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  error(): boolean {
    return this.data.status < 200 || this.data.status >= 300;
  }

  style() {
    let val = this.data.average;

    if (val <= 0) {
      return 'bad';
    } else if (val < 500) {
      return 'good';
    } else if (val < 1000) {
      return 'ok'
    } else {
      return 'bad';
    }
  }

}
