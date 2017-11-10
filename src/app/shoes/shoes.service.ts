import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UPDATE_SHOE } from '../state/shoes.reducer';
import { ShoeModel } from '../state/shoe.model';
import { ShoesModel } from '../state/shoes.model';
import { AbstractTimedHttpService, Scheduler } from '../service/abstract-timed-http.service';

function compare(v1: ShoeModel, v2: ShoeModel) {
  if (v2.primary) {
    return 1;
  } else if (v1.primary) {
    return -1;
  } else {
    return v2.percentage > v1.percentage ? 1 : -1;
  }
}

@Injectable()
export class ShoesService extends AbstractTimedHttpService {

    constructor(public store: Store<AppState>, scheduler: Scheduler, public http: Http) { 
        super(store, scheduler, http);
    }

    getInterval() {
        return 30000;
    }

    getPath() {
         return '/api/shoes'
    };

    getErrorMessage() {
        return 'failed to load shoes';
    }

    before() {
        return {};
    }

    failure(response: Response, before: any) { }

    success(response: Response, before: any) {
        let shoes = new ShoesModel();

        for (let entry of response.json()) {
            let shoe = new ShoeModel();
            shoe.id = entry.id;
            shoe.name = entry.name;
            shoe.brand = entry.brand;
            shoe.model = entry.model;
            shoe.description = entry.description ? entry.description : '---';
            shoe.distance = entry.distance;
            shoe.percentage = entry.percentage;
            shoe.progress = entry.progress;
            shoe.primary = entry.primary;

            shoes.shoes.push(shoe);
        }

        shoes.shoes.sort((v1, v2) => compare(v1, v2));

        this.store.dispatch({type: UPDATE_SHOE, payload: shoes});
    }

}