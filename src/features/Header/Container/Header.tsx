import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useAuthenticatedUser } from '../../../App';
import { Menus } from '../Component/Menu';
import { Title } from '../Component/Title';

const Header = () => {
    const userData = useAuthenticatedUser();
    return (
        <AppBar sx={{bgcolor: '#000062'}} position="static">
            <Toolbar>
                <Title />
                <Menus userName={userData?.givenName + ' ' + userData?.familyName} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
