import { AuthenticationModel } from './authentication/authentication.model';
import { ProfileModel } from './profile.model';

export interface AppState {
    authentication: AuthenticationModel,
    profile: ProfileModel
}
