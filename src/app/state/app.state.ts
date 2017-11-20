import { AuthenticationModel } from './authentication.model';
import { ChallengesModel } from './challenges.model';
import { DataSet } from './data-set.model';
import { PingModel } from './ping.model';
import { ProfileModel } from './profile.model';
import { IProgressItem } from './progress-item.model';
import { ShoesModel } from './shoes.model';
import { StreaksModel } from './streaks.model';
import { SummaryModel } from './summary.model';
import { YearlyTotalsModel } from './yearly-total.model';

export interface AppState {
    authentication: AuthenticationModel,
    challenges: ChallengesModel,
    dataSet: DataSet,
    ping: PingModel,
    profile: ProfileModel,
    progress: Array<IProgressItem>,
    shoes: ShoesModel,
    streaks: StreaksModel,
    summary: SummaryModel,
    yearlyTotals: YearlyTotalsModel
}
