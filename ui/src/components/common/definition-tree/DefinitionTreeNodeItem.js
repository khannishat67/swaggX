import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import uuid from 'uuidv4';
import _ from 'lodash';
import WFDraggableDropableObject from '../../common/controls/WFDraggableDropableObject';
import { saveDefinitionProperty, copyDefinitionHierarchy } 
    from '../../../store/actions/SwaggerActions';
import { fetchSubCategoryHierarchy } from '../../../store/actions/DataDictionaryActions';
import { DefintionDropTarget } from '../../../constants/ItemTypes';

const DefinitionTreeNodeItem = (props) => {
    const dispatch = useDispatch();
    const _onDrop = (dropItem) => {
        if (dropItem.property && dropItem.property.name) {
            if (props.type && props.type === 'object') {
                if (dropItem.property.type === 'object') {
                    if (dropItem.property.definitionId && dropItem.property.definitionId !== props.definitionId) {
                        dispatch(copyDefinitionHierarchy(dropItem.property.definitionId, dropItem.property.id, props.definitionId, props.id));
                    }
                    else {
                        dispatch(fetchSubCategoryHierarchy(dropItem.property, props.id, props.definitionId, DefintionDropTarget.TREE));
                    }
                }
                else {
                    let newProperty = { ...dropItem.property, id: uuid(), parentid: props.id };
                    dispatch(saveDefinitionProperty(props.definitionid, newProperty));
                }
            }
        }
    }
    return (
        <WFDraggableDropableObject property={props} className="dropzone-tree-element" onDrop={_onDrop}>
            <span className="node-container">
                <span className="type-container">{typeChar(props.type)}</span>
                <span className="title-container">{props.name}</span>
                <span className="required-container">{requiredChar(props.required)}</span>
            </span >
        </WFDraggableDropableObject >
    );
}

const typeChar = (type) => {
    return type ? type.charAt(0).toUpperCase() : '';
}

const requiredChar = (required) => {
    if (required !== undefined && required === true)
        return "*";
    return "";
}

const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        id: prevProps.id,
        definitionid: prevProps.definitionid,
        type: prevProps.type,
        name: prevProps.name,
        required: prevProps.required,
        editable: prevProps.editable,
    };

    const nextResponse = {
        id: nextProps.id,
        definitionid: nextProps.definitionid,
        type: nextProps.type,
        name: nextProps.name,
        required: nextProps.required,
        editable: nextProps.editable,
    };
    return _.isEqual(prevResponse, nextResponse);
}

DefinitionTreeNodeItem.propTypes = {
    id: PropTypes.string.isRequired,
    definitionId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    editable: PropTypes.string.isRequired
}

export default memo(DefinitionTreeNodeItem, areEqual);




