import Grid from '@mui/material/Grid';
import Logo from '../../../assets/images/QuickStart_Logo.svg';
import { Link, useLocation } from 'react-router-dom';

const styles = {
    linkStyle: {
        'textDecoration': 'none',
        color: 'white',
    },
    selectedLinkStyle: {
        'textDecoration': 'none',
        color: 'white',
        borderBottom: '2px Solid',
    },
};


export const Title = () => {
    const location = useLocation();

    return (
        <>
            <Grid container alignItems={'center'}>
                <Grid item xs={8} sm={6} md={6}>
                    <Link to="/">
                        <img src={Logo} alt=""  height= "55px" width= "252px" />
                    </Link>
                </Grid>
                <Grid item >
                    <Link
                        to="/messages"
                        style={location.pathname === '/messages' ? styles.selectedLinkStyle : styles.linkStyle }
                    >
                        Messages
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

