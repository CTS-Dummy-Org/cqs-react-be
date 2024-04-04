import { render, screen } from '@testing-library/react';
import CustomizedToast from '../Container/Toast';

const props = {
    className: 'sc-bdvvaa dhbDEm',
    message: 'Message Saved.',
    showToast: true,
};

describe('CustomizedToast', () => {
    test('renders CustomizedToast component', () => {
        render(<CustomizedToast {...props} />);
    });
});

describe('renders Toast', (): any => {
    render(<CustomizedToast {...props} />);
    const linkElement = screen.getByText('Message Saved.');
    expect(linkElement).toBeInTheDocument();
});
