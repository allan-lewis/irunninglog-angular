import { AuthenticationModel } from './authentication.model';
import { ChallengesModel } from './challenges.model';
import { DataSet } from './data-set.model';
import { PingModel } from './ping.model';
import { ProfileModel } from './profile.model';
import { IProgressItem } from './progress-item.model';
import { ShoesModel } from './shoes.model';
import { StatisticsDateRange } from './statistics-date-range.model';
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
    selectedDateRange: StatisticsDateRange,
    shoes: ShoesModel,
    streaks: StreaksModel,
    statisticsDateRanges: StatisticsDateRange [],
    summary: SummaryModel,
    yearlyTotals: YearlyTotalsModel
}
