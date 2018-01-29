import { Action } from '@ngrx/store';
import { StreaksModel } from './streaks.model';

export const STREAKS_UPDATE = '67c7c00a-3431-4cb1-a1ae-dcff917933ba';

export class UpdateStreaksAction implements Action {
    readonly type: string = STREAKS_UPDATE;
    constructor(public payload: any) { }
}

export function streaksModelReducer(state: StreaksModel = new StreaksModel(), action: UpdateStreaksAction) {
  switch (action.type) {
    case STREAKS_UPDATE:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : Object.assign({}, action.payload);
    default:
      return state;
  }
}
