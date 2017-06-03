import { AuthenticationModel } from './authentication/authentication.model';
import { ProfileModel } from './header/profile.model';

export interface AppState {
    authentication: AuthenticationModel,
    profile: ProfileModel
}
