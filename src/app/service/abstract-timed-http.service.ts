import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

export abstract class AbstractTimedHttpService {

    constructor(public http: Http) { }

    load() {
        this.call();

        Observable.interval(this.getInterval()).subscribe(x => this.call());
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
