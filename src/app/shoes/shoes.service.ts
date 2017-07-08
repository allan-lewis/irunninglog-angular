import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UPDATE_SHOE } from '../state/shoes.reducer';
import { ShoeModel } from '../state/shoe.model';
import { Observable } from 'rxjs';

@Injectable()
export class ShoesService {

    constructor(public store: Store<AppState>, public http: Http) { }

    load() {
        this.http.get('api/shoes').catch(err => {
            return Observable.throw('failed to load shoes');
        }).subscribe(x => this.update(x.json()));
    }

    update(json: Array<ShoeModel>) {
        for (let entry of json) {
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