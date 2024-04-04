import { render } from '@testing-library/react';
import MessageList from '../../Component/MessageList';

const msgResp = [
    {
        id: 1,
        active: false,
        msg: 'Hello, Mercury!',
    },
    {
        id: 2,
        active: false,
        msg: 'Hello, Mars!',
    },
    {
        id: 3,
        active: false,
        msg: 'Hello, Venus!',
    },
    {
        id: 4,
        active: false,
        msg: 'Hello, Neptune!',
    },
    {
        id: 5,
        active: true,
        msg: 'Hello, World!',
    },
];

const props = {
    setMsgList: jest.fn(),
    msgList: msgResp,
    className: 'sc-bdvvaa jXgQup',
};

describe('messageList Tests', () => {
    test('displays Messages', () => {
        render(<MessageList {...props} />);
    });
});
