import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AuthenticationState } from '../state/authentication.model';

export abstract class Scheduler {

    abstract schedule(): void;

}

@Injectable()
export class NoOpScheduler implements Scheduler {
    
    schedule() {
        // Nothing to do here
    }

}

export abstract class AbstractTimedHttpService {

    constructor(store: Store<AppState>, scheduler: Scheduler, public http: Http) {
        store.select(state => state.authentication).filter(x => !!x && x.authenticated == AuthenticationState.Authenticated).subscribe(x => {
            this.call();

            scheduler.schedule();
        });
    }

    private call() {
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
