import { Action } from '@ngrx/store';
import { SummaryModel } from './summary.model';

export const SUMMARY_UPDATE = 'fa2589c2-3bd7-48d3-9c89-9dc41134e611';

export class UpdateSummaryAction implements Action {
    readonly type: string = SUMMARY_UPDATE;
    constructor(public payload: any) { }
}

export function summaryModelReducer(state: SummaryModel = {thisWeek: '--', thisMonth: '--', thisYear: '--', allTime: '--'}, action: UpdateSummaryAction) {
  switch (action.type) {
    case SUMMARY_UPDATE:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : Object.assign({}, action.payload);
    default:
      return state;
  }
}
