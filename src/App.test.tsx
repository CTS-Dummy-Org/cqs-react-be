// import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('renders Hello World link', () => {
    let container: any;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);

        (axios.get as jest.Mock).mockResolvedValue(
            Promise.resolve({
                data: { data: { data: { data: { activeMessage: 'Hello world' } } }, status: 200 },
            })
        );
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    const renderWithRouter = (ui: any, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
    
        return render(ui, { wrapper: Router });
    };

    test('act works in this case', async () => {
        const {container} = renderWithRouter(
            <App />
        );

        expect(container.getElementsByClassName('app-error')).toBeTruthy();
    });
});
