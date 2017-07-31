import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { PingModel } from '../state/ping.model';
import { PING_UPDATE } from '../state/ping.reducer';
import { Observable } from 'rxjs';
import { AbstractTimedHttpService } from '../service/abstract-timed-http.service';

@Injectable()
export class PingService extends AbstractTimedHttpService {

    private pings: number [] = [];

    constructor(public store: Store<AppState>, public http: Http) { 
        super(http);
    }

    getInterval() {
        return 15000;
    }

    getPath() {
         return '/api/ping'
    };

    getErrorMessage() {
        return 'failed to ping';
    }

    before() {
        return {timestamp: new Date().getTime()};
    }

    failure(response: Response, before: any) { 
        let model = new PingModel();
        model.status = response.status;
        model.last = new Date().getTime() - before['timestamp'];

        this.pings.length = 0;

        this.store.dispatch({type: PING_UPDATE, payload: model});
    }

    success(response: Response, before: any) {
        let last = new Date().getTime() - before['timestamp'];

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
