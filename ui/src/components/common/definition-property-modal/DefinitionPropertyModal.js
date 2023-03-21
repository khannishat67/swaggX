import React from 'react';
import _ from 'lodash';
import uuid from 'uuidv4';
import Modal from '@material-ui/core/Modal';
import './DefinitionPropertyModal.less';
import DefinitionHeader from '../definition/DefinitionHeader';
import DefinitionPropertyModalBody from './DefinitionPropertyModalBody';
import DefinitionPropertyModalFooter from './DefinitionPropertyModalFooter';

import * as resources from '../../../resources/resource-strings.json';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const DefinitionPropertyModal = (props) => {

    const [modalStyle] = React.useState(getModalstyle());
    const { property } = props;

    let initState = props.edit ? { ...filterBlank(property) } : { ...defaultState };
    const [state, setState] = React.useState({ ...initState });

    const onChange = (key, value) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }

    const onSave = () => {
        let newState = state;
        if (!props.edit) {
            let parent = property.parentid || null;
            if (state.position && state.position === 'child') {
                parent = property.id;
            }
            newState = { ...state, id: uuid(), parentid: parent };
        }
        props.saveProperty(newState);
        setState(defaultState);
        props.handleClose();
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

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            maxWidth="sm"
            fullWidth={true}
        >
            <DialogTitle>Definition Property</DialogTitle>
            <DialogContent>

                <DefinitionPropertyModalBody
                    property={{ ...state }}
                    selection={property}
                    edit={props.edit}
                    onChange={onChange}
                    onDeleteProperty={onDeleteProperty}
                    onReset={onReset}
                />
            </DialogContent>
            <DialogActions>
                <DefinitionPropertyModalFooter {...props} onSave={onSave} />
            </DialogActions>
        </Dialog>
    );
}

const filterBlank = (obj) => {
    let blankKeys = Object.keys(obj).filter(item => {
        return item !== 'parentid' && (obj[item] === undefined || obj[item] === null);
    });
    return _.omit(obj, blankKeys);
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

const defaultState = {
    name: '',
    description: '',
    type: resources.definition.types[0].value,
    array: false,
    required: false,
    position: 'sibling'
}

export default DefinitionPropertyModal;



