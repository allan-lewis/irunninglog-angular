import { Action } from '@ngrx/store';
import { IProgressItem } from './progress-item.model';
import { ChallengesModel } from './challenges.model';
import { ShoesModel } from './shoes.model';
import { StreaksModel } from './streaks.model';
 
export const UPDATE_CHALLENGES = '7ab68622-18e1-4f12-a2b6-494febdc2dbd';
export const UPDATE_SHOES = 'a75e69f9-82c4-42f8-a9cc-be5de90686fa';
export const UPDATE_STREAKS = 'aeb467d0-8cbd-4312-9b42-308f1c34af82';

export function progressListReducer(state: Array<IProgressItem> = [], action: Action) {
  
  switch (action.type) {
      case UPDATE_STREAKS:
        return mergeStreaks(state, action.payload);
      case UPDATE_SHOES:
        return mergeShoes(state, action.payload);
      case UPDATE_CHALLENGES:
        return mergeChallenges(state, action.payload);
      default:
        return state;
  }

}

function mergeStreaks(state: Array<IProgressItem>, streaks: StreaksModel): Array<IProgressItem> {
    let returnVal = [];

    return JSON.stringify(returnVal) === JSON.stringify(state) ? state : returnVal;
}

function mergeShoes(state: Array<IProgressItem>, shoes: ShoesModel): Array<IProgressItem> {
    let returnVal = [];

    return JSON.stringify(returnVal) === JSON.stringify(state) ? state : returnVal;
}

function mergeChallenges(state: Array<IProgressItem>, challenges: ChallengesModel): Array<IProgressItem> {
    let returnVal = [];

    return JSON.stringify(returnVal) === JSON.stringify(state) ? state : returnVal;
}

