import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { Observable } from 'rxjs/Observable';

export class AbstractService {

    constructor(protected store: Store<AppState>, protected http: Http) { }

    protected error(error: Response | any) {
        return Observable.throw('failed to load profile');
    }

}
