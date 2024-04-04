import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { InputAdornment, TextField} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { updateMessage } from '../Service/message';
import Loader from '../../Loader';
import styled from 'styled-components';

const MessageEdit = styled.div`
    height: 147px;
    width: 80%;
    margin: 36px 26px;
`;
const ActiveMessageStyle = styled.span`
    height: 16px;
    color: rgba(0, 0, 0, 0.6);
    font-family: 'ROBOTO';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    line-height: 16px;
`;

const EditContent = styled.div`
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ButtonContainer = styled.div`
    height: 42px;
    width: 180px;
    float: right;
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
`;


const EditMessage = (props: any) => {
    const [editText, seteditText] = useState('');
    const [enableBtn, setEnableBtn] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (props.updateMessage && Object.keys(props.updateMessage)) seteditText(props.updateMessage.message);
    }, [props]);
    const onClickCancel = () => {
        if (props.updateMessage && props.updateMessage.active === true) {
            navigate('/');
        } else {
            props.closeEditBox();
        }
    };
    const onClickClear = () => {
        seteditText('');
    };
    const saveMessage = () => {
        if (editText) {
            setIsLoader(true);
            const data = { id: props.updateMessage.id, message: editText };
            updateMessage(data)
                .then((res) => {
                    if (res.status === 204) {
                        if (props.updateMessage && props.updateMessage.active === true) {
                            navigate('/');
                        } else {
                            setIsLoader(true);
                            props.closeEditBox();
                        }
                    }
                })
                .catch((err) => {
                    const message = err.response && err.response.statusText ? err.response.statusText : '';
                    setIsLoader(false);
                    props.showMessageToast('Error occurred while updating message - ' + message);
                });
        }
    };
    return props.updateMessage && Object.keys(props.updateMessage).length > 0 ? (
        <MessageEdit>
            {isLoader && <Loader />}
            <ActiveMessageStyle>
                {props.updateMessage.active ? 'Active Message' : 'Modify Message'}
            </ActiveMessageStyle>
            {props.updateMessage.active ? <StarIcon sx={{ height: '11px',width: '12px', color: '#f9a825'}} /> : null}
            <EditContent>
                <TextField
                    id="standard-basic"
                    value={editText}
                    fullWidth
                    size="medium"
                    onChange={(e) => {
                        seteditText(e.target.value);
                        e.target.value.length === 0 || props.updateMessage.message === e.target.value
                            ? setEnableBtn(false)
                            : setEnableBtn(true);
                    }}
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <ClearIcon 
                                    sx={{
                                        height:'10.83px', 
                                        width: '10.83px', 
                                        cursor: 'pointer', 
                                        zIndex: 2 
                                    }}
                                    onClick={() => onClickClear()} 
                                />
                            </InputAdornment>
                        ),
                    }}
                />
            </EditContent>
            <ButtonContainer>
                <Button 
                    variant='text' 
                    sx={{
                        color: '#0033a0',
                    }}
                    onClick={() => onClickCancel()}>
                    CANCEL
                </Button>
                <Button
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
                    variant="contained"
                    color="primary"
                    disabled={!enableBtn}
                    onClick={() => saveMessage()}
                >
                    SAVE
                </Button>
            </ButtonContainer>
        </MessageEdit>
    ) : null;
};
export default EditMessage;
