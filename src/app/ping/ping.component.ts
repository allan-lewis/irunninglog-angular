import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PingModel } from '../state/ping.model'
import { PingService } from './ping.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'irl-component-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnChanges {

  mode = 'indeterminate';

  @Input()
  ping: PingModel;

  constructor(public snackBar: MdSnackBar) {

  }

  ngOnChanges(): void {
    // console.log('PingComponent:ngOnChanges');
  }

  openSnackBar() {
    this.snackBar.open('Snack Bar!');
    // this.snackBar.openFromComponent(PizzaPartyComponent, {
    //   duration: 500,
    // });
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



// @Component({
//   selector: 'irl-component-ping-good',
//   template: `
//     <div>
//       <span class="status-label">Avg:</span> <span class="status-value">{{ping.average | number:'1.0-0' | comma}}</span><span class="status-ms">ms</span>
//       <span class="status-label">Last:</span> <span class="status-value">{{ping.last | comma}}</span><span class="status-ms">ms</span>
//       <span class="status-label">Min:</span> <span class="status-value">{{ping.min | comma}}</span><span class="status-ms">ms</span>
//       <span class="status-label">Max:</span> <span class="status-value">{{ping.max | comma}}</span><span class="status-ms">ms</span>
//     </div>
//   `,
//   styleUrls: ['./ping.component.css']
// })
// export class PingGoodComponent {

//   @Input() ping: PingModel;

// }

// @Component({
//   selector: 'irl-component-ping-bad',
//   template: `
//     <div>
//       <span class="error-code-label">Last:</span> <span class="error-code-value">{{ping.last | comma}}</span><span class="status-ms">ms</span>
//       <span class="error-code-label">Error Code:</span> <span class="error-code-value">{{ping.status}}</span>
//     </div>
//   `,
//   styleUrls: ['./ping.component.css']
// })
// export class PingBadComponent {

//   @Input() ping: PingModel;

// }
