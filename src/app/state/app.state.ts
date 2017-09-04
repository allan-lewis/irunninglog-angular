import { AuthenticationModel } from './authentication.model';
import { ChallengeModel } from './challenge.model';
import { PingModel } from './ping.model';
import { ProfileModel } from './profile.model';
import { ShoeModel } from './shoe.model';
import { StreaksModel } from './streaks.model';
import {SummaryModel } from './summary.model';

export interface AppState {
    authentication: AuthenticationModel,
    challenges: Array<ChallengeModel>,
    ping: PingModel,
    profile: ProfileModel,
    shoes: Array<ShoeModel>,
    streaks: StreaksModel,
    summary: SummaryModel
}
