import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { StreaksModel } from '../state/streaks.model';
import { StreaksService } from './streaks.service';

@Component({
  selector: 'irl-component-streaks',
  templateUrl: './streaks.component.html',
  styleUrls: ['./streaks.component.css']
})
export class StreaksComponent implements OnInit {

  model: StreaksModel;

  constructor(public store: Store<AppState>, public streaksService: StreaksService) {
    this.store.select(state => state.streaks).filter(x => !!x).subscribe(x => this.model = x);
  }

  ngOnInit() {
    this.streaksService.load();
  }

}
