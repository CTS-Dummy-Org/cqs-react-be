import { Log, User } from 'oidc-client';
import IdentityClient from '../utils/IdentityClient';
import { AuthenticateUser } from '../types';

export default class AuthService {
    private identityClient: IdentityClient;

    constructor(identityClient: IdentityClient) {
        this.identityClient = identityClient;
    }

    public isLoggedIn(): Promise<boolean> {
        return this.identityClient
            .getUser()
            .then((user: User | null) => {
                const currentUser = !!user && !user?.expired;
                return currentUser;
            })
            .catch((err) => {
                return false;
            });
    }

    public completeLogin(): Promise<User> {
        return this.identityClient.signInCallback().then((user: User) => {
            return user;
        });
    }

    public async authenticateUser(): Promise<AuthenticateUser> {
        const isLoggedIn = await this.isLoggedIn();
        if (isLoggedIn) {
            return true;
        }
        const isCodeExists = this.isAuthCodePresent();
        if (isCodeExists) {
            return this.signInCallback();
        }
        return this.signIn();
    }

    public getUser(): Promise<User | null> {
        return this.identityClient.getUser();
    }

    public async getJwtToken(): Promise<string | undefined | void> {
        try {
            return await this.identityClient.getUser().then((user: User | null) => {
                if (!user) {
                    Log.error('User Info not available');
                    this.signOut();
                }
                const validUser = this.validateAccessToken(user);
                if (!validUser) {
                    this.identityClient
                        .signInSilent()
                        .then((newUser) => {
                            return `Bearer ${newUser?.access_token}`;
                        })
                        .catch((error) => {
                            Log.warn('Unable to the fetch the User Details. Please sign in');
                            this.identityClient.signIn();
                        });
                }

                return `Bearer ${user?.access_token}`;
            });
        } catch {
            Log.error('Error while fetching User Info.');
            this.signOut();
        }
    }

    private signIn(): Promise<void> {
        return this.identityClient.signIn();
    }

    public signOut(): Promise<void> {
        return this.identityClient.signOut();
    }

    private signInCallback(): Promise<User> {
        return this.identityClient.signInCallback();
    }

    public isAuthCodePresent(): boolean {
        let isExist = false;
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            isExist = true;
        }
        return isExist;
    }

    private validateAccessToken(user: User | null): boolean {
        if (!user) {
            return false;
        }
        if (user?.expired || user?.expires_in < 60) {
            return false;
        }
        return true;
    }
}
