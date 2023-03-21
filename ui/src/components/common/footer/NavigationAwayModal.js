import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as resourceString from '../../../resources/resource-strings.json';

export default (props) => {
    return (
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{resourceString.navaway_title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {resourceString.navaway_message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseConfirmed} color="primary">
                    {resourceString.select_btn}
                </Button>
                <Button onClick={props.handleClose} color="primary">
                    {resourceString.cancel_btn}
                </Button>
            </DialogActions>
        </Dialog>
    );
}