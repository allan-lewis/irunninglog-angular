import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PingModel } from '../state/ping.model'
import { PingService } from './ping.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Component({
  selector: 'irl-component-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {

  mode = 'indeterminate';
  color = 'primary';

  ping: PingModel;

  constructor(public pingService: PingService, public store: Store<AppState>) {
    this.store.select(state => state.ping).subscribe(x => this.ping = x);
  }

  ngOnInit() {
    this.pingService.load();
  }

  style() {
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

}

@Component({
  selector: 'irl-component-ping-good',
  template: `
    <div>
      <span class="status-label">Avg:</span> <span class="status-value">{{ping.average | number:'1.0-0' | comma}}</span><span class="status-ms">ms</span>
      <span class="status-label">Last:</span> <span class="status-value">{{ping.last | comma}}</span><span class="status-ms">ms</span>
      <span class="status-label">Min:</span> <span class="status-value">{{ping.min | comma}}</span><span class="status-ms">ms</span>
      <span class="status-label">Max:</span> <span class="status-value">{{ping.max | comma}}</span><span class="status-ms">ms</span>
    </div>
  `,
  styleUrls: ['./ping.component.css']
})
export class PingGoodComponent {

  @Input() ping: PingModel;

}

@Component({
  selector: 'irl-component-ping-bad',
  template: `
    <div>
      <span class="error-code-label">Last:</span> <span class="error-code-value">{{ping.last | comma}}</span><span class="status-ms">ms</span>
      <span class="error-code-label">Error Code:</span> <span class="error-code-value">{{ping.status}}</span>
    </div>
  `,
  styleUrls: ['./ping.component.css']
})
export class PingBadComponent {

  @Input() ping: PingModel;

}
