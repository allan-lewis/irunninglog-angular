import { AuthModel } from './auth.model';
import { ProfileModel } from './profile.model';

export interface AppState {
    auth: AuthModel,
    profile: ProfileModel
}
