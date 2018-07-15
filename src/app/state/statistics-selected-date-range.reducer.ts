import { Action } from '@ngrx/store';
import { StatisticsDateRange, THIS_YEAR, ALL_TIME } from './statistics-date-range.model';

export const SELECTION_UPDATE = '76c7c43a-1221-4cb1-a1ae-dcef917933ba';
const KEY = 'selected_date_range';

export class UpdateSelectedRangeAction implements Action {
    readonly type: string = SELECTION_UPDATE;
    constructor(public payload: StatisticsDateRange) { }
}

function getInitialState(): StatisticsDateRange {
    const string = localStorage.getItem(KEY);

    let range: StatisticsDateRange;
    if (!string) {
        range = THIS_YEAR;
        localStorage.setItem(KEY, JSON.stringify(range));
    } else {
        range = JSON.parse(string);
    }

    return range;
}

export function selectedDateRangeReducer(state: StatisticsDateRange = getInitialState(), action: UpdateSelectedRangeAction) {
  switch (action.type) {
    case SELECTION_UPDATE:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        localStorage.setItem(KEY, after);

        return before == after ? state : action.payload;
    default:
      return state;
  }
}
