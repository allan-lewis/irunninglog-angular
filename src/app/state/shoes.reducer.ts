import { Action } from '@ngrx/store';
import { ShoesModel } from './shoes.model';

export const UPDATE_SHOE = '16414c61-a4ce-41d1-8112-33b8c1881983';

export class UpdateShoeAction implements Action {
    readonly type: string = UPDATE_SHOE;
    constructor(public payload: any) { }
}

export function shoesModelReducer(state = new ShoesModel(), action: UpdateShoeAction) {
  switch (action.type) {
    case UPDATE_SHOE:
        let before = JSON.stringify(state);
        let after = JSON.stringify(action.payload);

        return before == after ? state : Object.assign({}, action.payload);
    default:
      return state;
  }
}
