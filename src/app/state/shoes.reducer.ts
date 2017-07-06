import { Action } from '@ngrx/store';
import { ShoeModel } from './shoe.model';

export const ADD_SHOE = '16414c61-a4ce-41d1-8112-33b8c1881983';

export function shoesModelReducer(state: Array<ShoeModel> = [], action: Action) {
  switch (action.type) {
    case ADD_SHOE:
          return [
              ...state,
              action.payload
          ];
    default:
      return state;
  }
}