import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ChallengesModel } from '../state/challenges.model';
import { IProgressItem } from '../state/progress-item.model';
import { ShoesModel } from '../state/shoes.model';
import { StreaksModel } from '../state/streaks.model';
import { UPDATE_CHALLENGES, UPDATE_SHOES, UPDATE_STREAKS } from '../state/progress-list.reducer';

@Injectable()
export class ProgressListService {

    constructor(private store: Store<AppState>) { 
        this.store.select(state => state.shoes).filter(x => !!x && x.shoes.length > 0).subscribe(x => this.shoes(x));
        this.store.select(state => state.streaks).filter(x => !!x).subscribe(x => this.streaks(x));
        this.store.select(state => state.challenges).filter(x => !!x && x.challenges.length > 0).subscribe(x => this.challenges(x));
    }

    private shoes(model: ShoesModel) {
        this.store.dispatch({type: UPDATE_SHOES, payload: model});
    }

    private streaks(model: StreaksModel) {
        this.store.dispatch({type: UPDATE_STREAKS, payload: model});
    }

    private challenges(model: ChallengesModel) {
        this.store.dispatch({type: UPDATE_CHALLENGES, payload: model});
    }

    progressList(): Observable<IProgressItem[]> {
        return this.store.select(state => state.progress).filter(x => !!x);
    }

}
