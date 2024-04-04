import { Log, User, UserManager, UserManagerSettings } from 'oidc-client';
import { IIdentityClient } from '../types';

export default class IdentityClient implements IIdentityClient {
    private _userManager: UserManager;

    private static instance: IdentityClient;

    private constructor(settings: UserManagerSettings) {
        this._userManager = new UserManager(settings);
    }

    public static getInstance(settings?: UserManagerSettings): IdentityClient {
        if (!IdentityClient.instance) {
            if (settings) {
                IdentityClient.instance = new IdentityClient(settings);
            } else {
                Log.error('Unable to get the instance');
            }
        }

        return IdentityClient.instance;
    }

    public getUserManager(): UserManager {
        return this._userManager;
    }

    public getUser(): Promise<User | null> {
        return this._userManager.getUser();
    }

    public signIn(): Promise<void> {
        return this._userManager.signinRedirect({ state: window.location.pathname + window.location.search });
    }

    public signOut(): Promise<void> {
        return this._userManager.signoutRedirect();
    }

    public signInCallback(): Promise<User> {
        return this._userManager.signinRedirectCallback();
    }

    public signInSilent(): Promise<User> {
        return this._userManager.signinSilent();
    }
}
