import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { PROFILE_SET } from '../state/profile.reducer';
import { AbstractService } from '../service/abstract.service';

@Injectable()
export class ProfileService extends AbstractService {

    constructor(public store: Store<AppState>, public http: Http) { 
        super(store, http);
    }

    load() {
        this.http.get('api/profile').catch(err => {
            return this.error(err);
        }).subscribe(x => this.store.dispatch({type: PROFILE_SET, payload: x.json()}));
    }  

}
