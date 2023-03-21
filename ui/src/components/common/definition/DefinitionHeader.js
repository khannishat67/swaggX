import { IconButton, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setDefinition } from '../../../store/actions/SwaggerActions';
import WFLabelInput from '../controls/WFLabelInput';

const DefinitionHeader = (props) => {
    const dispatch = useDispatch();

    const updateProperty = (e) => {
        dispatch(setDefinition(props.definition.id, { key: "key", value: e.target.value }));
    }

    const deleteDefinition = () => {
        props.deleteDefinition(props.definition.id);
    }

    return (
        <div className="definition-header-container">
            <div>
                <Typography className="mb-3">({props.definition.type})</Typography>
                <WFLabelInput textkey={`${props.definition.id}_text_key`} editable={props.editable} showInput={true}
                    value={props.definition.key} onChange={updateProperty} className="editable-input" autofocus={true} />
            </div>
            <IconButton onClick={deleteDefinition} edge="end">
                <Delete />
            </IconButton>
        </div>
    );
}
const definitionType = (props) => {
    if (props.definition.type) {
        switch (props.definition.type) {
            case "object":
                return "O";
            case "array":
                return "[ ]";
            default:
                return props.definition.type.charAt(0).toUpperCase();
        }
    }
    return "O";
}
export default DefinitionHeader;
