import axios, { Method } from 'axios';
import { getAuthenticationService } from '../utils/IdentityUtils';

export const performApiRequest = async (method: Method, url: string, params: any) => {
    const body = method === 'get' ? 'params' : 'data';
    const authService = getAuthenticationService();
    const jwt = await authService?.getJwtToken();
    const headers = {
        Authorization: jwt,
    };
    const API_URL = process.env.REACT_APP_BP_API_URL;
    return await axios.request({ method, url, headers, baseURL: API_URL, [body]: params || {} });
};

export const requestWithoutToken = async (method: Method, url: string, params: any) => {
    const body = method === 'get' ? 'params' : 'data';
    const API_URL = process.env.REACT_APP_BP_API_URL;
    return await axios.request({ method, url, baseURL: API_URL, [body]: params || {} });
};
