import { performApiRequest } from '../../../services/apiHandler';

export const getActiveMessage = async () => {
    return await performApiRequest('get', '/api/v1/messages', null);
};

export const addNewMessage = async (currentMessage: any) => {
    return await performApiRequest('post', '/api/v1/messages', { message: currentMessage});
};
export const getMessageList = async () => {
    return await performApiRequest('get', '/api/v1/messages', null);
};

export const deleteMessage = async (msgId: any) => {
    const messageId = msgId;
    return await performApiRequest('delete', `/api/v1/messages/${messageId}`, null);
};

export const updateMessage = async (msg: any) => {
    return await performApiRequest('put', `/api/v1/messages/${msg.id}`, msg);
};
