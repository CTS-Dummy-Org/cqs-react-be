import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ActiveMsg = styled.p`
    color: rgba(0, 0, 0, 0.87);
    font-family: Cognizant Sans;
    font-size: 48px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 56px;
    text-align: center;
    margin: auto;
`;

const ActiveMessage = (props: any) => {

    const navigate = useNavigate();
    return (
        <Grid container height='80vh' alignContent={'center'} justifyContent={'center'} flexDirection={'column'}>
            <Grid item>
                <ActiveMsg>
                    {props.activeMessage.trim() === ''
                        ? `Looks like you don't have any active message.`
                        : props.activeMessage}
                </ActiveMsg>
            </Grid>
            <Grid item mt={3} mb={3} display={'flex'} justifyContent={'center'}>
                <Button variant="contained" 
                    sx={{ 
                        background: '#0033a0',
                        '&:hover': {
                            backgroundColor: '#0033a0',
                        },
                        '&:disabled': {
                            backgroundColor: '#7596dc',
                            color: 'white',
                        },
                    }}
                    onClick={() => navigate('/messages')}>
                    {props.activeMessage.trim() === '' ? `ADD MESSAGE` : `Edit Message`}
                </Button>
            </Grid>
        </Grid>
    );
};

export default ActiveMessage;
