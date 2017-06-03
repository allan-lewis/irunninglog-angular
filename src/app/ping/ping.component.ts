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

}

@Component({
  selector: 'irl-component-ping-good',
  template: `
    <div class="ping-result">
      <span class="status-label">Last:</span> <span class="status-value">{{ping.last}}</span><span class="status-ms">ms</span>
      <span class="status-label">Avg:</span> <span class="status-value">{{ping.average}}</span><span class="status-ms">ms</span>
      <span class="status-label">Min:</span> <span class="status-value">{{ping.max}}</span><span class="status-ms">ms</span>
      <span class="status-label">Max:</span> <span class="status-value">{{ping.min}}</span><span class="status-ms">ms</span>
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
    <div class="ping-result">
      <span class="error-code-label">Last:</span> <span class="error-code-value">{{ping.last}}</span><span class="status-ms">ms</span>
      <span class="error-code-label">Error Code:</span> <span class="error-code-value">{{ping.status}}</span>
    </div>
  `,
  styleUrls: ['./ping.component.css']
})
export class PingBadComponent {

  @Input() ping: PingModel;

}
