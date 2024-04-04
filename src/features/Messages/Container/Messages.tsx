import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MessageList from '../Component/MessageList';
import AddMessage from '../Component/AddMessage';
import AlertDialog from '../../ConfirmDialog';
import { getMessageList, deleteMessage, updateMessage as updateMessageStatus } from '../Service/message';
import EditMessage from '../Component/EditMessage';
import CustomizedToast from '../../Toast';

export const Messages = () => {
    const [msgList, setMsgList] = useState([]);
    const [open, setOpen] = useState(false);
    const [msgObj, setMsgObj] = useState({ id: null, message: null, active: false });
    const [updateMessage, setUpdateMessage] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleDelete = () => {
        setOpen(false);
        deleteMessage(msgObj.id)
            .then((response) => {
                if (response.status === 204) {
                    messageList();
                    setUpdateMessage({});
                    setToastMessage('Message Deleted');
                    setShowToast(true);
                }
            })
            .catch((err) => {
                const message = err.response && err.response.statusText ? err.response.statusText : '';
                setToastMessage('Error occurred while deleting message - ' + message);
                setShowToast(true);
            });
    };
    const activeMessage = (mesgId: string) => {
        updateMessageStatus({ id: mesgId, active: true })
            .then((response) => {
                if (response.status === 204) {
                    messageList();
                    setUpdateMessage({});
                }
            })
            .catch((err) => {
                const message = err.response && err.response.statusText ? err.response.statusText : '';
                setToastMessage('Error occurred while feteching messages - ' + message);
                setShowToast(true);
            });
    };
    const handleClose = () => {
        setOpen(false);
    };

    const openDialogBox = (obj: any) => {
        setOpen(true);
        setMsgObj(obj);
    };

    const messageList = (initialLoad = false) => {
        getMessageList()
            .then((response) => {
                if(response.status === 200) {
                    setMsgList(response.data);
                    if (initialLoad) {
                        const activeMessage =
                            response.data &&
                            response.data.filter((message: any) => {
                                return message.active === true;
                            }, []);
                        if (activeMessage && activeMessage.length > 0) {
                            setUpdateMessage(activeMessage[0]);
                        }
                    }
                }
            })
            .catch((err) => {
                const message = err.response && err.response.statusText ? err.response.statusText : '';
                setToastMessage('Error occurred while feteching messages - ' + message);
                setShowToast(true);
            });
    };

    useEffect(() => {
        messageList(true);
    }, []);

    const closeEditBox = () => {
        messageList();
        setUpdateMessage({});
        setToastMessage('Message Saved');
        setShowToast(true);
    };

    const showMessageToast = (messageToast: string) => {
        setToastMessage(messageToast);
        setShowToast(true);
    };

    return (
        <Grid container >
            <Grid item xs={12} sm={6} md={4} >
                <MessageList
                    openDialogBox={openDialogBox}
                    msgList={msgList}
                    setMsgList={setMsgList}
                    editMessage={setUpdateMessage}
                    activeMessage={activeMessage}
                />
                <AddMessage messageList={messageList} />
                <AlertDialog
                    handleDelete={handleDelete}
                    handleClickOpen={handleClickOpen}
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    msg={msgObj.message}
                    active={msgObj.active}
                />
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
                {updateMessage && Object.keys(updateMessage).length > 0 ? (
                    <EditMessage
                        updateMessage={updateMessage}
                        closeEditBox={closeEditBox}
                        showMessageToast={showMessageToast}
                    />
                ) : (
                    ''
                )}
            </Grid>
            <CustomizedToast message={toastMessage} showToast={showToast} setShowToast={setShowToast} />
        </Grid>
    );
};
