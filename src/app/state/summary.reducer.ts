import { Action } from '@ngrx/store';
import { SummaryModel } from './summary.model';

export const SUMMARY_UPDATE = 'fa2589c2-3bd7-48d3-9c89-9dc41134e611';

export function summaryModelReducer(state: SummaryModel = {thisWeek: '--', thisMonth: '--', thisYear: '--', allTime: '--'}, action: Action) {
  switch (action.type) {
    case SUMMARY_UPDATE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
