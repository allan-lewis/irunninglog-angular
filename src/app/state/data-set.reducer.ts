import { Action } from '@ngrx/store';
import { DataSet } from './data-set.model';

export const UPDATE_DATA_SET = '0ae1153d-ef18-4ffd-8d35-736476edd759';

export function dataSetModelReducer(state: DataSet = {points: []}, action: Action) {
  switch (action.type) {
    case UPDATE_DATA_SET:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : action.payload;
    default:
        return state;
  }
}
