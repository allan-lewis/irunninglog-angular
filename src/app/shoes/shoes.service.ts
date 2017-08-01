import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UPDATE_SHOE } from '../state/shoes.reducer';
import { ShoeModel } from '../state/shoe.model';
import { AbstractTimedHttpService } from '../service/abstract-timed-http.service';

@Injectable()
export class ShoesService extends AbstractTimedHttpService {

    constructor(public store: Store<AppState>, public http: Http) { 
        super(http);
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

            this.store.dispatch({type: UPDATE_SHOE, payload: shoe});
        }
    }

}