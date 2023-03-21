import { IconButton } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { Add, Delete, Edit } from '@material-ui/icons';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteDefinitionProperty, saveDefinitionProperty, setDefinition,
    updatePathRequestBodyType, updatePathResponseBodyType
} from '../../../store/actions/SwaggerActions';
import DefinitionPropertyModal from '../definition-property-modal/DefinitionPropertyModal';

const DefinitionToolbar = (props) => {

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        open: false,
        edit: false
    });

    const handleClose = () => {
        setState(prevState => ({
            ...prevState,
            open: false
        }));
    };

    const updateType = (e) => {
        if (props.editable === 'true' && props.source === 'definition') {
            dispatch(setDefinition(props.definition.id, { key: "type", value: e.target.checked ? "array" : "object" }));
        }
        else {
            if (props.source === 'request') {
                dispatch(updatePathRequestBodyType(props.id, e.target.checked));
            }
            else if (props.source === 'response') {
                dispatch(updatePathResponseBodyType(props.pathId, props.id, e.target.checked));
            }
        }
    }

    const saveProperty = (paramObject) => {
        dispatch(saveDefinitionProperty(props.definition.id, paramObject));
    }

    const onAdd = () => {
        setState(prevState => ({
            open: true,
            edit: false
        }));
    }

    const onEdit = () => {
        if (props.selectedProperty && props.selectedProperty !== null && props.selectedProperty !== '') {
            setState(prevState => ({
                open: true,
                edit: true
            }));
        }
    }
    const deleteProperty = () => {
        if (props.selectedProperty && props.selectedProperty !== null && props.selectedProperty !== '') {
            dispatch(deleteDefinitionProperty(props.definition.id, props.selectedProperty));
            props.setSelectedProperty(null);
        }
    }

    const selectedProperty = () => {
        return _.find(props.definition.properties, { id: props.selectedProperty }) || {};
    }

    const btnStyle = () => {
        return classNames('param-toolbar-icon material-icons-outlined', {
            ['param-toolbar-icon-disabled material-icons-outlined']: (props.selectedProperty === undefined // eslint-disable-line
                || props.selectedProperty === null || props.selectedProperty === '')
        });
    }

    const defClass = () => {
        if (props.editable !== 'true')
            return 'definition-body-type';
        return 'definition-body-type-def';
    }

    return (
        <>
            {
                state.open ? <DefinitionPropertyModal open={state.open} handleClose={handleClose}
                    edit={state.edit}
                    saveProperty={saveProperty}
                    property={selectedProperty()} /> : null}
            <div className={defClass()}>
                {props.editable !== 'true'  && <div>
                    <Checkbox
                        value="primary"
                        onChange={updateType}
                        //disabled={props.editable === 'false'} //eslint-disable-line
                        checked={props.definition.type === 'array' ? true : false}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <label>Array</label>
                </div>}
                {props.editable === 'true' && (<div className="header-toolbar-icons">
                    <IconButton size="small" edge="end" onClick={onAdd}><Add /></IconButton>
                    <IconButton size="small" edge="end" onClick={onEdit}><Edit /></IconButton>
                    <IconButton size="small" edge="end" onClick={deleteProperty}><Delete /></IconButton>
                </div>)}
            </div>
        </>
    );
}
export default DefinitionToolbar;
