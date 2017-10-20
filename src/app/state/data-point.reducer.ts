import { Action } from '@ngrx/store';
import { DataPoint } from './data-point.model';

export const UPDATE_DATA_POINTS = 'c0941dc5-5f17-474d-bf94-095e6cd8dd54';
export const UPDATE_DATA_TOTALS = '072e8954-274f-4971-be0b-d0def07cf00b';

export function dataPointModelReducer(state: Array<Array<DataPoint>> = [[], []], action: Action) {
  switch (action.type) {
    case UPDATE_DATA_POINTS:
        return [action.payload, state[1]];
    case UPDATE_DATA_TOTALS:
        return [state[0], action.payload];
    default:
        return state;
  }
}
