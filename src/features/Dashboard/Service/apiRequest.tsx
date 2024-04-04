import { performApiRequest } from '../../../services/apiHandler';

export const getActiveMessage = async () => {
    return await performApiRequest('get', '/api/v1/messages', null);
};
