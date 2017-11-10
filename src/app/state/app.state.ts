import { AuthenticationModel } from './authentication.model';
import { ChallengeModel } from './challenge.model';
import { DataSet } from './data-set.model';
import { PingModel } from './ping.model';
import { ProfileModel } from './profile.model';
import { ShoesModel } from './shoes.model';
import { StreaksModel } from './streaks.model';
import { SummaryModel } from './summary.model';
import { YearlyTotalModel } from './yearly-total.model';

export interface AppState {
    authentication: AuthenticationModel,
    challenges: Array<ChallengeModel>,
    dataSet: DataSet,
    ping: PingModel,
    profile: ProfileModel,
    shoes: ShoesModel,
    streaks: StreaksModel,
    summary: SummaryModel,
    yearlyTotals: Array<YearlyTotalModel>
}
