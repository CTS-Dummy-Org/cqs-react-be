import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import axios from 'axios';
import Dashboard from '../../Container/Dashboard';

jest.mock('axios');

describe('Dashboard Test', () => {
    beforeEach(() => {
        (axios.get as jest.Mock).mockResolvedValue(
            () =>
                Promise.resolve({
                    data: { data: { data: { data: { activeMessage: 'Hello world' } } }, status: 200 },
                })
        );
    });

    afterEach(cleanup);

    test('Test active message get method invoke', async () => {
        // Render Dashboard
        render(<Dashboard />);
        // useEffect should be called to get active message component
        expect(await axios.request).toHaveBeenCalled();
    });
});
