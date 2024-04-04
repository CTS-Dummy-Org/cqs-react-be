import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Container/Header';


describe('HeaderStyledComponent', () => {
    test('renders HeaderStyledComponent component', () => {
        render(
            <Router>
                <Header />
            </Router>
        );
    });
});
