import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = (props: any) => {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {!props.active ? (
                    <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete the message ${props.msg}?`}</DialogTitle>
                ) : (
                    <DialogTitle id="alert-dialog-title">{` Active message cannot be deleted  `}</DialogTitle>
                )}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" />
                </DialogContent>
                {!props.active ? (
                    <DialogActions>
                        <Button onClick={props.handleClose}  sx={{color: '#0033a0'}}>
                            Cancel
                        </Button>
                        <Button onClick={props.handleDelete} sx={{color: '#0033a0'}} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions>
                        <Button onClick={props.handleClose} sx={{color: '#0033a0'}} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
};

export default AlertDialog;
