import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const LoaderAligned = styled.div`
    text-align: center;
`;

export const Loader = () => {
    return (
        <LoaderAligned  id="loader">
            <CircularProgress />
        </LoaderAligned>
    );
};
