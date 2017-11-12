import { Action } from '@ngrx/store';
import { StreaksModel } from './streaks.model';

export const STREAKS_UPDATE = '67c7c00a-3431-4cb1-a1ae-dcff917933ba';

export function streaksModelReducer(state: StreaksModel = null, action: Action) {
  switch (action.type) {
    case STREAKS_UPDATE:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : Object.assign({}, action.payload);
    default:
      return state;
  }
}
