import { render } from '@testing-library/react';
import AddMessage from '../../Component/AddMessage';

describe('AddMessage', () => {
    test('Test AddMessage TextBox', () => {
        const { getByTestId } = render(<AddMessage />);
        expect(getByTestId('textBox'));
    });
});

describe('AddMessage', () => {
    test('Test AddMessage Label', () => {
        const { getByTestId } = render(<AddMessage />);
        expect(getByTestId('label')).toHaveTextContent('ADD A MESSAGE');
    });
});
