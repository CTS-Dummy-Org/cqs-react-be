import { User as AuthUser, UserManager } from 'oidc-client';

export interface User {
    email: string;
    familyName: string;
    givenName: string;
}

export interface IIdentityClient {
    getUser(): Promise<AuthUser | null>;
    signIn(): Promise<void>;
    signOut(): Promise<void>;
    signInCallback(): Promise<AuthUser>;
    getUserManager(): UserManager;
}

export type AuthenticateUser = void | AuthUser | boolean;
