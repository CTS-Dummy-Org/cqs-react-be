import { render } from '@testing-library/react';
import { Messages } from '../../Container/Messages';

describe('AddMessage', () => {
    test('Test AddMessage TextBox', () => {
        const { getByTestId } = render(<Messages />);
        expect(getByTestId('textBox'));
    });
});
