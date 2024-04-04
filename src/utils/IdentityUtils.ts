import IdentityClient from './IdentityClient';
import AuthService from '../services/authServices';
import { WebStorageStateStore, InMemoryWebStorage } from 'oidc-client';
import { requestWithoutToken, performApiRequest } from '../services/apiHandler';

let authService: AuthService | null;

async function loadAuthContext(): Promise<IdentityClient> {
    const idpResponse = await requestWithoutToken('GET', '/api/v1/identityConfig', null);
    const identity = IdentityClient.getInstance({
        authority: idpResponse.data.idpHost,
        client_id: idpResponse.data.clientId,
        redirect_uri: idpResponse.data.redirectURI,
        response_type: 'code',
        scope: 'openid profile',
        loadUserInfo: false,
        userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
        metadata: {
            authorization_endpoint: idpResponse.data.authorizationEndpoint,
            issuer: idpResponse.data.issuer,
            token_endpoint: idpResponse.data.tokenEndpoint,
            end_session_endpoint: `${idpResponse.data.endSessionEndpoint}`,
        },
    });
    return Promise.resolve(identity);
}

export const authenticationService = async () => {
    if (!authService) {
        const identityClient = await loadAuthContext();
        authService = new AuthService(identityClient);
    }
    return authService;
};

export const getAuthenticationService = (): AuthService => authService!;

export const logout = () => {
    const authService = getAuthenticationService();
    authService.signOut();
};

export const getAuthorizated = async () => {
    const authorized = await performApiRequest('GET', '/api/v1/authorized', null);
    return authorized;
};
