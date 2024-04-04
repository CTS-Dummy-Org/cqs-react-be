import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import { useState } from 'react';
import { addNewMessage } from '../Service/message';
import CustomizedToast from '../../Toast';
import styled from 'styled-components';

const LableAligned = styled.div`
    text-align: center;
`;

const MessageContainer = styled.div`
    padding: 0px 24px 36px 24px;
    height: 114px;
    width: 328px;
`;

const AddMessage = (props: any) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleSubmit = () => {
        addNewMessage(currentMessage)
            .then((response) => {
                if(response.status === 201){
                    setCurrentMessage('');
                    props.messageList();
                    setToastMessage('Message Saved');
                    setShowToast(true);
                }
            })
            .catch((err) => {
                const message = err.response && err.response.statusText ? err.response.statusText : '';
                setToastMessage('Error occurred while saving message - ' + message);
                setShowToast(true);
                setCurrentMessage('');
            });
    };

    return (
        <div data-testid="main-holder">
            <CustomizedToast message={toastMessage} showToast={showToast} setShowToast={setShowToast} />
            <MessageContainer data-testid="message-holder">
                <TextField
                    data-testid="textBox"
                    fullWidth
                    sx={{ height: '57px'}}
                    label="Add a Message"
                    id="outlined-basic"
                    variant="outlined"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <Button
                    disabled={currentMessage.trim() ? false : true}
                    onClick={() => handleSubmit()}
                    sx={{mt: '15px', ml: '137px', height: '42px', width: '191px'}}
                    variant="outlined"
                    color="primary"
                >
                    <Add sx={{height:'22px', width: '22px'}} />
                    <LableAligned data-testid="label">
                        ADD A MESSAGE
                    </LableAligned>
                </Button>
            </MessageContainer>
        </div>
    );
};

export default AddMessage;
