import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs/Observable';
import { PROFILE_SET } from './profile.reducer';

@Injectable()
export class ProfileService {

    constructor(private store: Store<AppState>, private http: Http) { }

    load() {
        this.http.get('api/profile').catch(err => {
            return this.error(err);
        }).subscribe(x => this.response(x));
    }

    private error(error: Response | any) {
        return Observable.throw('failed to load profile');
    }  
    
    private response(response: Response) {
        let json = response.json();

        this.store.dispatch({type: PROFILE_SET, payload: json});
    }

}
