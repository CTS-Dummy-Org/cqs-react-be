import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditMessage from '../../Component/EditMessage';

describe('<EditMessage /> Tests', () => {
    describe('EditMessage Component', () => {
        test('renders EditMessage component', () => {
            render(
                <BrowserRouter>
                    <EditMessage />
                </BrowserRouter>
            );
        });
    });
});
