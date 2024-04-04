import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import AppError from './App';

test('renders App Error component', (): any => {
    render(
        <Router>
            <AppError />
        </Router>
    );
});

test('full app error rendering/navigating', () => {
    render(<AppError />, { wrapper: Router });
});
