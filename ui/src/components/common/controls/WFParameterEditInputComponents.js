import React, { useEffect } from 'react';
import _ from 'lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { Chip, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';

export const ParameterTextarea = (props) => {
    return (
        <TextField className="mb-16" key={`${props.id}_TextField`}
            label={props.label}
            variant={props.variant}
            name={props.name}
            value={props.params[props.name]}
            onChange={props.onChange} multiline />

    );
}

export const ParameterCheckbox = (props) => {
    return (
        <FormControlLabel control={<Checkbox
            key={`$(props.id)_checkbox`}
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            checked={props.params[props.name]}
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />} label={props.label} {...props} />
    );
}

export const ParameterSelect = (props) => {
    return (
        <div className="flex-grow mb-16 flex-row">
            <FormControl variant="outlined" className="flex-grow">
                {(props.showLabel === undefined || props.showLabel === true) && <InputLabel htmlFor={`${props.id}_input_text`}>{props.name}</InputLabel>}

                <Select name={props.name}
                    label={props.name}
                    disabled={props.disabledFields && props.disabledFields.length > 0 ?
                        props.disabledFields.includes(props.name) : false}
                    value={props.params[props.name]} onChange={props.onChange}
                >
                    {props.values.map(item => {
                        return (<MenuItem key={item} value={item}>{item.toString()} </MenuItem>);
                    })}
                </Select>
            </FormControl>
            {
                props.showDelete &&
                <DeleteProperty name={props.name} deleteProperty={props.deleteProperty} />
            }
        </div>
    );
}

export const ParameterInput = (props) => {
    return (
        <FormControl variant="outlined" className="mb-16">
            {(props.showLabel === undefined || props.showLabel === true) && <InputLabel htmlFor={`${props.id}_input_text`}>{props.name}</InputLabel>}
            <OutlinedInput id={`${props.id}_input_text`}
                label={props.name}
                type={props.type}
                disabled={props.disabledFields && props.disabledFields.length > 0 ?
                    props.disabledFields.includes(props.name) : false}
                step="any"
                name={props.name} value={props.params[props.name]}
                onChange={props.onChange}
                endAdornment={
                    props.showDelete &&
                    <InputAdornment position="end">
                        <DeleteProperty name={props.name} deleteProperty={props.deleteProperty} />
                    </InputAdornment>
                }
            >
            </OutlinedInput>
        </FormControl>
    );
}

export const ParameterEnum = (props) => {
    const [enumValue, setEnumValue] = React.useState('');
    const [enums, setEnums] = React.useState([]);

    useEffect(() => {
        setEnums(props.params.values || []);
        //eslint-disable-next-line
    }, [props.params]);

    const onChange = (e) => {
        setEnumValue(e.target.value);
    }

    const addEnum = () => {
        enums.push(enumValue);
        props.onChange(' values', enums);
        setEnumValue('');
    }

    const onDelete = (names) => {
        props.deleteProperty([...names, 'values']);
        setEnums([]);
    }
    const onDeleteValue = (value) => {
        props.onChange(' values', enums);
        const pos = enums.indexOf(value);
        enums.splice(pos,1)
        setEnums(enums);
    }
    return (
        <div key={`${props.id}_enum`} className="w-100 mb-16 flex-column align-items-stretch">
            <div className="flex-row mb-8">
                <FormControl variant="outlined">
                    <InputLabel htmlFor={`${props.id}_input_text`}>{props.name}</InputLabel>
                    <OutlinedInput
                        label={props.name}
                        id={`${props.id}_input_text`}
                        name={props.name}
                        disabled={props.disabledFields && props.disabledFields.length > 0 ?
                            props.disabledFields.includes(props.name) : false}
                        onChange={onChange}
                        value={enumValue}
                        endAdornment={
                            <InputAdornment>
                                <IconButton onClick={addEnum}>
                                    <Add />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {props.showDelete && <DeleteProperty name={props.name} deleteProperty={onDelete} />}
            </div>
            <div className="flex-row">

                {
                    enums.map(enumm => <Chip label={enumm} key={enumm} onDelete={ () => onDeleteValue(enumm)} />)
                }
            </div>

        </div>
    );
}

const DeleteProperty = (props) => {
    const deleteItem = () => {
        props.deleteProperty([props.name]);
    }
    return (
        <IconButton onClick={deleteItem}><Delete /> </IconButton>
    );
}

export const DynamicPropertyInput = (props) => {
    let properties = props.swaggerProps.default.dynamicFields[props.params.type] || props.swaggerProps.default.dynamicFields['string'];
    let propertyObj = _.find(properties, { name: props.name === 'values' ? 'enum' : props.name });
    if (propertyObj) {
        if (props.name === 'values') {
            return (
                <ParameterEnum
                    id={propertyObj.id}
                    key={propertyObj.id}
                    name={propertyObj.name}
                    type={propertyObj.type}
                    disabledFields={props.disabledFields}
                    params={props.params}
                    onChange={props.onChangeEnum}
                    deleteProperty={props.deleteProperty}
                    values={propertyObj.values}
                    showDelete={true}
                />
            );
        }
        else {
            if (propertyObj.type === 'select') {
                return (
                    <ParameterSelect
                        id={propertyObj.id}
                        key={propertyObj.id}
                        name={propertyObj.name}
                        type={propertyObj.type}
                        disabledFields={props.disabledFields}
                        params={props.params}
                        onChange={props.onChange}
                        deleteProperty={props.deleteProperty}
                        values={propertyObj.values}
                        showDelete={true}
                    />
                );
            }
            else {
                return (
                    <ParameterInput
                        id={propertyObj.id}
                        key={propertyObj.id}
                        name={propertyObj.name}
                        type={propertyObj.type}
                        disabledFields={props.disabledFields}
                        params={props.params}
                        onChange={props.onChange}
                        deleteProperty={props.deleteProperty}
                        showDelete={true}
                    />
                );
            }
        }
    }
    return null;
}

export const PropertySelector = (props) => {
    const properties = props.swaggerProps.default.dynamicFields[props.params["type"]] || [];
    return (
        <div className="flex-row w-100 mb-16">
            <FormControl className="flex-grow" variant="outlined">
                <InputLabel>{props.label}</InputLabel>
                <Select label={props.label} name='required' value={props.dynamicProperty}
                    onChange={props.onDynamicPropChange}>

                    {properties.map((item) => {
                        return (
                            <MenuItem key={`${item.type}_${item.name}`} value={item.name}>{item.name}</MenuItem>
                        );
                    })}
                </Select>

            </FormControl>
            <IconButton onClick={props.addProperty}>
                <Add />
            </IconButton>
        </div>
    );
}

export const getDynamicPropValue = (swaggerProps, params) => {
    let propertyValue = swaggerProps.default.dynamicFields[params.type]
        && swaggerProps.default.dynamicFields[params.type].length > 0 ?
        swaggerProps.default.dynamicFields[params.type][0].name : '';
    return propertyValue;
}

export const refactorPropertyName = (name) => {
    return (name === 'enum') ? 'values' : name;
}

export const onChangeHandler = (e) => {
    let name = e.target.name;
    let type = e.target.type;
    let value = "";

    switch (name) {
        case "type":
            value = e.target.value;
            break;
        case "array":
            value = e.target.checked;
            break;
        case "markRef":
            value = e.target.checked;
            break;
        case "required":
            value = (e.target.value !== undefined
                && (e.target.value === true || e.target.value === 'true')) ? true : false;
            break;
        case "exclusiveMinimum":
            value = (e.target.value !== undefined
                && (e.target.value === true || e.target.value === 'true')) ? true : false;
            break;
        case "exclusiveMaximum":
            value = (e.target.value !== undefined
                && (e.target.value === true || e.target.value === 'true')) ? true : false;
            break;
        default:
            value = e.target.value;
            break;
    }
    value = (type === 'number') ? parseFloat(value) : value;
    return { name, value };
}

export const onResetValue = (swaggerProps, oldType, params) => {
    let oldProperties = swaggerProps.default.dynamicFields[oldType].map((item) => {
        return item.name;
    });
    let newParams = _.omit(params, oldProperties);
    return newParams;
}

export const getPropertyObject = (swaggerProps, params, dynamicProperty) => {
    let properties = swaggerProps.default.dynamicFields[params["type"]];
    let propertyObj = _.cloneDeep(_.find(properties, { name: dynamicProperty }));
    return propertyObj;
}





