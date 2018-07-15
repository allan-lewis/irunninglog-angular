import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AuthenticationState } from '../state/authentication.model';

export abstract class Scheduler {

    abstract schedule(interval: number, func: () => void): void;

}

@Injectable()
export class NoOpScheduler implements Scheduler {
    
    schedule(interval: number, func: () => void) {
        // Nothing to do here
    }

}

@Injectable()
export class IntervalScheduler implements Scheduler {

    schedule(interval: number, func: () => void) {
        Observable.interval(interval).subscribe(x => { func(); });
    }

}

export abstract class AbstractTimedHttpService {

    constructor(public store: Store<AppState>, public scheduler: Scheduler, public http: Http) {

    }

    public init() {
        this.store.select(state => state.authentication).filter(x => !!x && x.authenticated == AuthenticationState.Authenticated).subscribe(x => {
            this.call();

            this.scheduler.schedule(this.getInterval(), () => this.call());
        });
    }

    protected call() {
        let json = this.before();

        this.http.get(this.getPath()).catch(err => this.caught(err, json)).filter(x => x instanceof Response).map(x => <Response> x).subscribe(x => this.success(x, json));
    }

    private caught(response: Response, json: any) {
        this.failure(response, json);

        return Observable.of(this.getErrorMessage());
    }

    abstract before(): any;

    abstract getInterval(): number

    abstract getPath(): string;

    abstract getErrorMessage(): string;

    abstract success(response: Response, before: any);

    abstract failure(response: Response, before: any);

}
