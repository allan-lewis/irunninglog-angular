import { AuthenticationModel } from './authentication.model';
import { ChallengeModel } from './challenge.model';
import { DataPoint } from './data-point.model';
import { PingModel } from './ping.model';
import { ProfileModel } from './profile.model';
import { ShoeModel } from './shoe.model';
import { StreaksModel } from './streaks.model';
import { SummaryModel } from './summary.model';
import { YearlyTotalModel } from './yearly-total.model';

export interface AppState {
    authentication: AuthenticationModel,
    challenges: Array<ChallengeModel>,
    dataPoints: Array<Array<DataPoint>>,
    ping: PingModel,
    profile: ProfileModel,
    shoes: Array<ShoeModel>,
    streaks: StreaksModel,
    summary: SummaryModel,
    yearlyTotals: Array<YearlyTotalModel>
}
