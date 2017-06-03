import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AbstractService } from '../service/abstract.service';
import { PingModel } from '../state/ping.model';
import { PING_UPDATE } from '../state/ping.reducer';
import { Observable } from 'rxjs';

@Injectable()
// TODO - Remove AbstractService
export class PingService extends AbstractService {

    constructor(public store: Store<AppState>, public http: Http) { 
        super(store, http);
    }

    load() {
        this.ping().subscribe(x => console.log(x));

        Observable.interval(15000).flatMap(() => this.ping()).subscribe(x => console.log(x));
    }  

    ping() {
        let timestamp = new Date().getTime();
        
        return this.http.get('api/ping').catch(err => this.failure(err, new Date().getTime() - timestamp));
    }

    failure(response: any, timestamp : number) {
        let model = new PingModel();
        model.status = response.status;
        model.last = timestamp;

        this.store.dispatch({type: PING_UPDATE, payload: model});

        return Observable.of('Caught an error' + response);
    }

    success(response: any, timestamp: number) {
        console.log('success', response);
    }

}
