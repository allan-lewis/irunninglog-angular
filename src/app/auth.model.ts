export enum AuthState {
    Authenticated,
    Unauthenticated,
    Unknown
}

export class AuthModel {

    id?: number;
    token?: string;
    authenticated: AuthState;

}
