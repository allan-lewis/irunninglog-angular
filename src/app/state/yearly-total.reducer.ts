import { Action } from '@ngrx/store';
import { YearlyTotalModel } from './yearly-total.model';

export const UPDATE_TOTALS = '25d05141-05ba-45dc-85c5-53f93ed1a4a8';

let map = new Map<Number, YearlyTotalModel>();

export function yearlyTotalModelReducer(state: Array<YearlyTotalModel> = [], action: Action) {
  switch (action.type) {
    case UPDATE_TOTALS:
      map.set(action.payload['year'], action.payload);

      return Array.from(map.values());
    default:
      return state;
  }
}
