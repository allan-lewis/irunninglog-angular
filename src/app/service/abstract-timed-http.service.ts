import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { AuthenticationState } from '../state/authentication.model';

export abstract class AbstractTimedHttpService {

    // TODO - Remove 'repeating'
    constructor(store: Store<AppState>, repeating: boolean, public http: Http) {
        store.select(state => state.authentication).filter(x => !!x && x.authenticated == AuthenticationState.Authenticated).subscribe(x => {
            this.call();

            // TODO - Use a provider to make this configurable/testable
            if (repeating) {
                // Observable.interval(this.getInterval()).subscribe(x => this.call());
            }
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
