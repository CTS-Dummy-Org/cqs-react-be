import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

const MessageContainer = styled.div`
    margin: 36px 26px;
`;

const MessageTitle = styled.div`
    width: 328px;
    margin-top:36px;
    height: 24px;
    width: 112px;
    color: rgba(0,0,0,0.87);
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0.18px;
    line-height: 24px;
    margin-bottom: 20px;
`;

const MessageLabel = styled.label`
    overflow-wrap: break-word;
`;

const renderList = (msgList: any, props: any) => {
    return msgList.map((obj: any) => {
        return (
            <Grid container key={obj.id} justifyContent={'flex-start'} alignItems={'center'}>
                <Grid item xs={6} sm={6} md={6}>
                    <MessageLabel>{obj.message}</MessageLabel>
                </Grid>
                <Grid item >
                    <Tooltip
                        title= {obj.active ? 'Message Saved' : 'Save Message'}
                        placement="top"
                        arrow
                    >
                        <IconButton
                            color="primary"
                            aria-label="set favourite"
                            onClick={() => props.activeMessage(obj.id)}
                        >
                            {obj.active ? (
                                <StarIcon sx={{color:'#F9A825'}} />
                            ) : (
                                <StarBorderIcon color='action' sx={{ opacity: 0.7, '&:hover': { color: 'blue' } }}/>
                            )}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Message" placement="top" arrow>
                        <IconButton onClick={() => props.editMessage(obj)}>
                            <CreateIcon color="action" sx={{ opacity: 0.7, '&:hover': { color: 'blue' } }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Message" placement="top" arrow>
                        <IconButton onClick={() => props.openDialogBox(obj)}>
                            <DeleteForeverIcon  color="action" sx={{ opacity: 0.7, '&:hover': { color: 'blue' } }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        );
    });
};

const MessageList = (props: any) => {
    const { msgList } = props;
    return (
        <MessageContainer>
            <MessageTitle>Messages</MessageTitle>
            {renderList(msgList, props)}
        </MessageContainer>
    );
};
export default MessageList;
