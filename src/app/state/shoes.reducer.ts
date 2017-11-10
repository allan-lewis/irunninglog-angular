import { Action } from '@ngrx/store';
import { ShoesModel } from './shoes.model';

export const UPDATE_SHOE = '16414c61-a4ce-41d1-8112-33b8c1881983';

export function shoesModelReducer(state = new ShoesModel(), action: Action) {
  switch (action.type) {
    case UPDATE_SHOE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
