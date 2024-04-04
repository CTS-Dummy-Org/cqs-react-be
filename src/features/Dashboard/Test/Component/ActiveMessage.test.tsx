import { render, screen } from '@testing-library/react';
import ActiveMessage from '../../Component/ActiveMessage';

jest.mock('react-router-dom', () => ({
    useNavigate: () => ({
        push: jest.fn(),
    }),
}));

describe('<ActiveMessage /> Tests', () => {
    it('displays "Active Message"', () => {
        const props = {
            activeMessage: 'Hello, World',
        };
        render(<ActiveMessage {...props} />);
        expect(screen.getByText('Hello, World')).toBeTruthy();
    });

    it('displays "default Message"', () => {
        const props = {
            activeMessage: '',
        };
        render(<ActiveMessage {...props} />);
        expect(screen.getByText(`Looks like you don't have any active message.`)).toBeTruthy();
    });


    it('displays "Edit Message"', () => {
        const props = {
            activeMessage: 'Hello, World',
        };
        render(<ActiveMessage {...props} />);
        expect(screen.getByText('Edit Message')).toBeTruthy();
    });
});
