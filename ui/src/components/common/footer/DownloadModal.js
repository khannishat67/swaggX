import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as resourceString from '../../../resources/resource-strings.json';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { setFileName } from '../../../store/actions/SwaggerActions';
export default (props) => {
    const dispatch = useDispatch();
    const fileInfo = useSelector(state => {
        return state.swagger.fileInfo;
    });
    const onChange = (e) => {
        dispatch(setFileName(e.target.value));
    };
    return (
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title" > {resourceString.save_to_file}</DialogTitle >
            <DialogContent>

                <DialogContentText id="alert-dialog-slide-description">
                    {resourceString.save_message}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="File name"
                    type="text"
                    fullWidth
                    value={fileInfo.fileName}
                    onChange={onChange}
                />
            </DialogContent >
            <DialogActions>
                <Button onClick={props.handleCloseConfirmed} color="primary">
                    {resourceString.ok_btn}
                </Button>
                <Button onClick={props.handleClose} color="primary">
                    {resourceString.cancel_btn}
                </Button>
            </DialogActions >
        </Dialog >
    );
}
