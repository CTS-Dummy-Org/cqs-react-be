import Snackbar from '@mui/material/Snackbar';

function CustomizedToast(props: any) {
    const vertical = 'bottom';
    const horizontal = 'left';
    
    const handleClose = (event?: any, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setShowToast(false);
    };
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={props.showToast}
            autoHideDuration={6000}
            onClose={handleClose}
            message={props.message}
            key={vertical + horizontal}
        />
    );
}
export default CustomizedToast;
