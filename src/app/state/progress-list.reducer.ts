import { Action } from '@ngrx/store';
import { IProgressItem } from './progress-item.model';
import { ChallengeModel } from './challenge.model';
import { ChallengesModel } from './challenges.model';
import { ShoeModel } from './shoe.model';
import { ShoesModel } from './shoes.model';
import { StreaksModel, StreakModel } from './streaks.model';
 
export const UPDATE_CHALLENGES = '7ab68622-18e1-4f12-a2b6-494febdc2dbd';
export const UPDATE_SHOES = 'a75e69f9-82c4-42f8-a9cc-be5de90686fa';
export const UPDATE_STREAKS = 'aeb467d0-8cbd-4312-9b42-308f1c34af82';

export class UpdateChallengesAction implements Action {
    readonly type: string = UPDATE_CHALLENGES;
    constructor(public payload: any) { }
}

export class UpdateShoesAction implements Action {
    readonly type: string = UPDATE_SHOES;
    constructor(public payload: any) { }
}

export class UpdateStreaksAction implements Action {
    readonly type: string = UPDATE_STREAKS;
    constructor(public payload: any) { }
}

export type UpdateProgressItemAction = UpdateChallengesAction | UpdateShoesAction | UpdateStreaksAction;

export function progressListReducer(state: Array<IProgressItem> = [], action: UpdateProgressItemAction) {
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

    for (let entry of state) {
        if (!(entry instanceof StreakModel)) {
            returnVal.push(entry);
        }
    }

    if (streaks.current) {
        returnVal.push(streaks.current);
    }

    if (streaks.longest) {
        returnVal.push(streaks.longest);
    }

    if (streaks.thisYear) {
        returnVal.push(streaks.thisYear);
    }

    returnVal.sort(sort);

    return JSON.stringify(returnVal) === JSON.stringify(state) ? state : returnVal;
}

function mergeShoes(state: Array<IProgressItem>, shoes: ShoesModel): Array<IProgressItem> {
    let returnVal = [];

    for (let entry of state) {
        if (!(entry instanceof ShoeModel)) {
            returnVal.push(entry);
        }
    }

    for (let entry of shoes.shoes) {
        returnVal.push(entry);
    }

    returnVal.sort(sort);

    return JSON.stringify(returnVal) === JSON.stringify(state) ? state : returnVal;
}

function mergeChallenges(state: Array<IProgressItem>, challenges: ChallengesModel): Array<IProgressItem> {
    let returnVal = [];

    for (let entry of state) {
        if (!(entry instanceof ChallengeModel)) {
            returnVal.push(entry);
        }
    }

    for (let entry of challenges.challenges) {
        returnVal.push(entry);
    }

    returnVal.sort(sort);

    return JSON.stringify(returnVal) === JSON.stringify(state) ? state : returnVal;
}

function sort(a: IProgressItem, b: IProgressItem): number {
    if (a.getOrder() > b.getOrder()) {
        return -1;
    } else if (b.getOrder() > a.getOrder()) {
        return 1;
    } else {
        return 0;
    }
}

