import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ADD_SHOE } from '../state/shoes.reducer';
import { ShoeModel } from '../state/shoe.model';

@Injectable()
export class ShoesService {

    constructor(public store: Store<AppState>, public http: Http) { }

    load() {
        let nu = new ShoeModel();
        nu.id = 'g2222100';
        nu.name = 'Nu';
        nu.brand = 'Mizuno';
        nu.model = 'Wave Inspire 11';
        nu.description = 'Pink';
        nu.primary = false;
        nu.distance = '410.5 mi';
        nu.percentage = 82;
        nu.progress = 'BAD';

        let omicron = new ShoeModel();
        omicron.id = 'g2276780';
        omicron.name = 'Omicron';
        omicron.brand = 'Mizuno';
        omicron.model = 'Wave Inspire 13';
        omicron.description = 'Green';
        omicron.primary = true;
        omicron.distance = '117 mi';
        omicron.percentage = 23;
        omicron.progress = 'GOOD';

        this.store.dispatch({type: ADD_SHOE, payload: nu});
        this.store.dispatch({type: ADD_SHOE, payload: omicron});
    }

}