import { Action } from '@ngrx/store';
import { StatisticsDateRange, THIS_YEAR, ALL_TIME } from './statistics-date-range.model';

export const RANGES_UPDATE = '67c7c34a-3431-4cb1-a1ae-dcef917933ba';

export class UpdateStatisticsRangesAction implements Action {
    readonly type: string = RANGES_UPDATE;
    constructor(public payload: any) { }
}

export function statisticsDateRangesReducer(state: StatisticsDateRange [] = [THIS_YEAR, ALL_TIME], action: UpdateStatisticsRangesAction) {
  switch (action.type) {
    case RANGES_UPDATE:
        action.payload.unshift(ALL_TIME);
        action.payload.unshift(THIS_YEAR);

        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : action.payload;
    default:
      return state;
  }
}
