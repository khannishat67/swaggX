import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDefinition } from '../../../store/actions/SwaggerActions';
import WFLabelInput from '../controls/WFLabelInput';
import * as resources from '../../../resources/resource-strings.json';
const DefinitionDescription = (props) => {

    const dispatch = useDispatch();
    const [state, setState] = useState({
        showDesc: props.definition.description ? true : false
    });

    const addDesc = (e) => {
        dispatch(setDefinition(props.definition.id, { key: "description", value: e.target.value }));
    }

    const addDescField = () => {
        setState(prevState => ({ ...prevState, showDesc: true }))
    }
    const nonEmptyDesc = () => {
        return props.definition.description && props.definition.description !== null
            && props.definition.description !== '' ? true : false;
    }

    return (
        <>
            {props.editable === 'true' ? (
                <WFLabelInput textkey={`${props.definition.id}_text_key`} editable={props.editable}
                    value={props.definition.description} placeHolder={resources.definition.addDescription} showInput={false} onChange={addDesc} className="editable-input" />
            ) : (nonEmptyDesc()) ?
                    (<Typography variant="subtitle1" >{props.definition.description}</Typography>) : null
            }
        </>
    );
}
export default DefinitionDescription;
