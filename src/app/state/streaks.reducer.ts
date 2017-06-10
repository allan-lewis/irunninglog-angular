import { Action } from '@ngrx/store';
import { StreaksModel } from './streaks.model';

export function streaksModelReducer(state: StreaksModel = {longest: {}, current: {}, thisYear: {}}, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
