import { Action } from '@ngrx/store';
import { DataPoint } from './data-point.model';

export const UPDATE_DATA_POINTS = 'c0941dc5-5f17-474d-bf94-095e6cd8dd54';

let data = new Map<String, DataPoint>();

export function dataPointModelReducer(state: Array<DataPoint> = [], action: Action) {
  switch (action.type) {
    case UPDATE_DATA_POINTS:
        return action.payload;
    default:
        return state;
  }
}
