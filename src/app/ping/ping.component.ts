import { Component } from '@angular/core';

@Component({
  selector: 'irl-component-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent {

  mode = 'indeterminate';
  color = 'primary';

}

@Component({
  selector: 'irl-component-ping-good',
  template: `
    <div class="ping-result">
      <span class="status-label">Last:</span> <span class="status-value">150</span><span class="status-ms">ms</span>
      <span class="status-label">Avg:</span> <span class="status-value">150</span><span class="status-ms">ms</span>
      <span class="status-label">Min:</span> <span class="status-value">150</span><span class="status-ms">ms</span>
      <span class="status-label">Max:</span> <span class="status-value">150</span><span class="status-ms">ms</span>
    </div>
  `,
  styleUrls: ['./ping.component.css']
})
export class PingGoodComponent {

}

@Component({
  selector: 'irl-component-ping-bad',
  template: `
    <div class="ping-result">
      <span class="error-code-label">Error Code:</span> <span class="error-code-value">503</span>
    </div>
  `,
  styleUrls: ['./ping.component.css']
})
export class PingBadComponent {

}
