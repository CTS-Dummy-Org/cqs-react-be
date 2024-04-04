import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import { Log, User } from 'oidc-client';

import { authenticationService } from './utils/IdentityUtils';
import { history } from './history';
import AppError from './AppError';
import { createRoot } from 'react-dom/client';

import App from './App';

async function run() {
    try {
        const authservice = await authenticationService();
        const response = await authservice.authenticateUser();
        if (response === true || response instanceof User) {
            history.push(response instanceof User && response?.state);
            return renderApp();
        }
    } catch (e) {
        // should render error screen
        // // eslint-disable-line
        Log.error(e);
        const container = document.getElementById('root');
        const root = createRoot(container!);
        return root.render(
            <React.StrictMode>
                <AppError error={e} />
            </React.StrictMode>
        );
    }
}
(async () => {
    await run();
})();

function renderApp() {
    const container = document.getElementById('root');
    const root = createRoot(container!);
    return root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
}
