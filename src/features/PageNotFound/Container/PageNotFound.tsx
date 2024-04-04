import { useNavigate } from 'react-router-dom';
import { SnackbarContent, Button } from '@mui/material';
import Plane from '../../../assets/images/Plane_404.svg';
import styled from 'styled-components';

const ScackbarStyled = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 24px;
`;

const PlaneImageStyled = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 38%;
`;
const NotFound = styled.div`
    text-align: center;
`;

const MsgOne = styled.div`
    color: rgba(0, 0, 0, 0.87);
    font-family: 'Cognizant Sans';
    font-size: 34px;
    letter-spacing: 0.25px;
    line-height: 42px;
    margin: 0;
`;

const MsgTwo= styled.div`
    color: rgba(0, 0, 0, 0.6);
    font-family: 'Cognizant Sans';
    font-size: 24px;
    letter-spacing: 0;
    line-height: 32px;
    margin: 16px 0;
`;

const PageNotFound = (props: any) => {
    const navigate = useNavigate();
    return (
        <div className={props.className}>
            <ScackbarStyled>
                <SnackbarContent sx={{  height: '48px',width: '448px', borderRadius:'4px' }} message={'Invalid URL'} />
            </ScackbarStyled>
            <PlaneImageStyled>
                <img src={Plane} alt="" height = '50%' width = '70%'/>
            </PlaneImageStyled>
            <NotFound>
                <MsgOne >Looks like you landed in the wrong location</MsgOne>
                <MsgTwo >We could not locate the page you requested</MsgTwo>
                <Button
                    sx={{
                        background: '#0033a0',
                        '&:hover': {
                            backgroundColor: '#0033a0',
                        },
                    }}
                    variant="contained"
                    onClick={() => navigate('/')}>
                        Back To Home
                </Button>
            </NotFound>
        </div>
    );
};

export default PageNotFound;
