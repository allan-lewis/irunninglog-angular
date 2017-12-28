import { Action } from '@ngrx/store';
import { DataSet } from './data-set.model';

export const UPDATE_DATA_SET = '0ae1153d-ef18-4ffd-8d35-736476edd759';

export class UpdateDataSetAction implements Action {
    readonly type: string = UPDATE_DATA_SET;
    constructor(public payload: any) { }
}

export function dataSetModelReducer(state: DataSet = {points: []}, action: UpdateDataSetAction) {
  switch (action.type) {
    case UPDATE_DATA_SET:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : Object.assign({}, action.payload);
    default:
        return state;
  }
}
