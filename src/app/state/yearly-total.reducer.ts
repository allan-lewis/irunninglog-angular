import { Action } from '@ngrx/store';
import { YearlyTotalsModel } from './yearly-total.model';

export const UPDATE_TOTALS = '25d05141-05ba-45dc-85c5-53f93ed1a4a8';

export function yearlyTotalModelReducer(state: YearlyTotalsModel = { totals: [] }, action: Action) {
  switch (action.type) {
    case UPDATE_TOTALS:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : Object.assign({}, action.payload);
    default:
      return state;
  }
}
