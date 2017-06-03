export enum AuthenticationState {
    Authenticated,
    Unauthenticated,
    Unknown
}

export class AuthenticationModel {

    id?: number;
    token?: string;
    authenticated: AuthenticationState;

}
