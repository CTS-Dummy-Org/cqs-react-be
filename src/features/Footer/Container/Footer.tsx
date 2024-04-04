import Grid from '@mui/material/Grid';
import styled from 'styled-components';

const FooterContainer = styled.div`
    position: fixed;
    bottom: 10px;
    width: 100%;
`;

const SpanStyled = styled.span`
    height: 16px;
    font-family: Roboto;
    font-size: 11px;
    letter-spacing: 0;
    line-height: 16px;
    text-align: center;
`;

const SpanBlue = styled(SpanStyled)`
    color: #0033a0;
    margin-left: 4px;
`;

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <FooterContainer>
            <Grid container mt={2} mb={2} justifyContent={'center'} display={'flex'}>
                <Grid item > 
                    <SpanStyled>
                        © {currentYear} Cognizant. All rights reserved. Cognizant Confidential and/or Trade Secret. Click
                        here for
                    </SpanStyled>
                </Grid>
                <Grid item >                
                    <SpanBlue> Cognizant’s Privacy Statement.</SpanBlue>
                </Grid>

            </Grid>
        </FooterContainer>
    );
};
