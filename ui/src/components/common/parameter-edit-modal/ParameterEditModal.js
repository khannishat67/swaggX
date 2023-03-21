import React from 'react';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';
import './ParameterEditModal.less';
import ParameterEditHeader from './ParameterEditHeader';
import ParameterEditFooter from './ParameterEditFooter';
import ParameterEditBody from './ParameterEditBody';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

const ParameterEditModal = (props) => {
    const [modalStyle] = React.useState(getModalstyle);
    const { param } = props;
    let initState = { ...defaultState, ...filterBlank(param), markRef: (param.markRef !== undefined) ? param.markRef : true }
    const [state, setState] = React.useState(initState);

    const onChange = (key, value) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }
    const onDeleteProperty = (keys) => {
        let newState = _.omit(state, [...keys]);
        setState(() => ({
            ...newState
        }));
    }

    const onReset = (newState) => {
        setState(() => ({
            ...newState
        }));
    }

    const onSave = () => {
        props._edit({ param: { ...state } });
        props.handleClose();
    }

    return (
        <Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                <ParameterEditHeader {...props} />
            </DialogTitle>
            <DialogContent>
                <ParameterEditBody params={state}
                    disabledFields={props.disabledFields}
                    hiddenFields={props.hiddenFields}
                    onChange={onChange}
                    onReset={onReset}
                    onDeleteProperty={onDeleteProperty} />
                <ParameterEditFooter {...props} onSave={onSave} />
            </DialogContent>
        </Dialog>
    );
}

const getModalstyle = () => {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const filterBlank = (obj) => {
    let blankKeys = Object.keys(obj).filter(item => {
        return (obj[item] === undefined || obj[item] === null);
    });
    return _.omit(obj, blankKeys);
}

const defaultState = {
    id: '',
    keyName: '',
    name: '',
    description: '',
    markRef: true,
    in: '',
    type: 'string',
    required: false
}

export default ParameterEditModal;


