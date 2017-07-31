import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

export abstract class AbstractTimedHttpService {

    constructor(public http: Http) { }

    load() {
        let json = this.before();

        this.call(json).subscribe(x => this.success(x.json(), json));
        
        Observable.interval(this.getInterval()).flatMap(() => this.call(json)).subscribe(x => this.success(x.json(), json));
    }

    private call(json: any) {
        return this.http.get(this.getPath()).catch(err => this.caught(err, json)).filter(x => x instanceof Response).map(x => <Response> x);
    }

    private caught(response: Response, json: any) {
        this.failure(response, json);

        return Observable.of(this.getErrorMessage());
    }

    abstract before(): any;

    abstract getInterval(): number

    abstract getPath(): string;

    abstract getErrorMessage(): string;

    abstract success(result: any, before: any);

    abstract failure(response: Response, before: any);

}
