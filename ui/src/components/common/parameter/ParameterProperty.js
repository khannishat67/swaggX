import React from 'react';
import _ from 'lodash';
import { Typography } from '@material-ui/core';

const ParameterProperty = (props) => {
    const newParams = _.cloneDeep(props.param);
    return (
        <>
            <Typography >{newParams.description}</Typography>
            <div className="param-property flex-column">
                {
                    Object.keys(newParams).map((key, index) => {
                        return ParamProperty(key, newParams, index);
                    })
                }
            </div>
        </>
    );
}

const ParamProperty = (key, props, index) => {
    if (['type', 'minLength', 'maxLength', 'required', 'minimum', 'maximum'].includes(key)) {
        return (
            <div className="flex-row mb-8" key={`${key}_${index}`}>
                <Typography className="mr-6">{key}:</Typography>
                <Typography>{key==='required' ? (props[key]===true ? 'true' : 'false') : props[key]}</Typography>
            </div>
        );
    }
}

export default ParameterProperty;

