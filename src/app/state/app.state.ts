import { AuthenticationModel } from './authentication.model';
import { PingModel } from './ping.model';
import { ProfileModel } from './profile.model';

export interface AppState {
    authentication: AuthenticationModel,
    ping: PingModel,
    profile: ProfileModel
}
