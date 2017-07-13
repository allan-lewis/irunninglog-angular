import { Component } from '@angular/core';
import { ShoeModel } from '../state/shoe.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ShoesService } from './shoes.service';

@Component({
  selector: 'irl-component-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css', '../progress/progress-cards.css']
})
export class ShoesComponent {

  model: Array<ShoeModel>;

  constructor(public store: Store<AppState>, shoesService: ShoesService) {
    this.store.select(state => state.shoes).filter(x => !!x).subscribe(x => this.model = x);
    shoesService.load();
  }

}
