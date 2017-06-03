import { AuthenticationModel } from './authentication.model';
import { ProfileModel } from './profile.model';

export interface AppState {
    authentication: AuthenticationModel,
    profile: ProfileModel
}
