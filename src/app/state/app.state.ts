import { AuthenticationModel } from './authentication.model';
import { PingModel } from './ping.model';
import { ProfileModel } from './profile.model';
import { ShoeModel } from './shoe.model';
import { StreaksModel } from './streaks.model';

export interface AppState {
    authentication: AuthenticationModel,
    ping: PingModel,
    profile: ProfileModel,
    shoes: Array<ShoeModel>,
    streaks: StreaksModel
}
