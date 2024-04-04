import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PageNotFound from '../Container/PageNotFound';

test('renders Error Page Component', (): any => {
    const renderWithRouter = (ui: any, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: Router });
    };
    renderWithRouter(<PageNotFound />);
});

test('Click "BACK TO HOME Button"', () => {
    const renderWithRouter = (ui: any, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: Router });
    };

    renderWithRouter(<PageNotFound />);
    const btnHome = screen.getByRole('button', { name: /BACK TO HOME/i });
    fireEvent.click(btnHome);
});

test('test "button name - BACK TO HOME"', () => {
    const renderWithRouter = (ui: any, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: Router });
    };
    renderWithRouter(<PageNotFound />);
    screen.getByRole('button', { name: /BACK TO HOME/i });
});
