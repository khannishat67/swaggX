import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default (props) => {
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const handlechange = event => {
        setValue(event.target.value);
        props._onChange(event);
    };

    return (
        <FormControl variant={props.variant} className={props.className} >
            <InputLabel id={props.labelid}>{props.label}</InputLabel>
            <Select
                label={props.label}
                name={props.name}
                labelid={props.labelid}
                id={props.labelselect}
                value={value}
                multiple={props.multiple}
                onChange={handlechange}
            >
                {props.values.map((item, index) => {
                    return (<MenuItem key={`${item.id}-${props.labelid}`} value={item.value}>{item.label}</MenuItem>);
                })}
            </Select >
        </FormControl>
    );
}
