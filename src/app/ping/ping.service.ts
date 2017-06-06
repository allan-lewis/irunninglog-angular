import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { PingModel } from '../state/ping.model';
import { PING_UPDATE } from '../state/ping.reducer';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PingService {

    private pings: number [] = [];

    constructor(public store: Store<AppState>, public http: Http) { }

    load() {
        this.ping().subscribe(x => this.success(x[0], x[1]));

        Observable.interval(15000).flatMap(() => this.ping()).subscribe(x => this.success(x[0], x[1]));
    }  

    ping() {
        let timestamp = new Date().getTime();
        
        return this.http.get('api/ping').catch(err => this.failure(err, timestamp)).filter(x => x instanceof Response).map(x => [x, timestamp]);
    }

    failure(response: Response, timestamp : number) {
        let model = new PingModel();
        model.status = response.status;
        model.last = new Date().getTime() - timestamp;

        this.pings.length = 0;

        this.store.dispatch({type: PING_UPDATE, payload: model});

        return Observable.of('Caught an error' + response);
    }

    success(response: any, timestamp: any) {
        let last = new Date().getTime() - timestamp;

        if (this.pings.length == 4) {
            this.pings.pop();
        }
        this.pings.unshift(last);

        let observable = Observable.from(this.pings);
        let model = new PingModel();
        model.status = response.status;
        model.last = last;
        observable.min().subscribe(x => model.min = x);
        observable.max().subscribe(x => model.max = x);
        observable.reduce((s, v) => s + v, 0).subscribe(x => model.average = x / this.pings.length);

        this.store.dispatch({type: PING_UPDATE, payload: model});
    }

}