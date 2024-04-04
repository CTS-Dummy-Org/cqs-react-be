import React, { Suspense, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Header from './features/Header';
import Footer from './features/Footer';
import Loader from './features/Loader';
import Routers from './routes';
import { getAuthenticationService, getAuthorizated, logout } from './utils/IdentityUtils';
import { User } from './types';

const AuthenticatedUserContext = React.createContext<any | null>(null);
function App() {
    const [authError, setAuthError] = useState('');
    const [authorized, setAuthorized] = useState(false);
    const [loggedInUser, setloggedInUser] = useState<User>({ email: '', givenName: '', familyName: '' });
    useEffect(() => {
        const authService = getAuthenticationService();
        authService?.getUser().then((user: any) => {
            setloggedInUser({
                email: user?.profile.email,
                givenName: user?.profile.given_name,
                familyName: user?.profile.family_name,
            });
        });

        getAuthorizated().then((res) => {
            res.status === 200 ? setAuthorized(true) : '';
        })
            .catch((err) => {
                setAuthError('Login Error - Access Denied');
                logout();
            });
    }, []);
    return (
        <div>
            <AuthenticatedUserContext.Provider value={loggedInUser}>
                {authorized ? 
                    (<>
                        <Header />                        
                        <Grid item xs={12}>
                            <Suspense fallback={<Loader />}>
                                <Routers />
                            </Suspense>
                        </Grid>
                        <Footer />
                    </>
                    )
                    :
                    (
                        <div className="app-error">{authError}</div>
                    )
                }
            </AuthenticatedUserContext.Provider>
        </div>
    );
}

export const useAuthenticatedUser = () => React.useContext(AuthenticatedUserContext);
export default App;
