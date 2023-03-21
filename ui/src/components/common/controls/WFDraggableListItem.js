import React, { useEffect, memo } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDragSource, dragStyle } from './WFDragDropHooks';


const WFDraggableListItem = (props) => {

    const [{ isDragging }, dragRef, preview] = useDragSource(props);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [preview]);

    const opacity = isDragging ? 0.4 : 1;

    return (
        <ListItem ref={dragRef}
            style={{ ...dragStyle, opacity }}
            {...props} button>
            {props.children}
        </ListItem>
    );
}
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        name: prevProps.name,
        selected: prevProps.selected,
        property: prevProps.property
    }
    const nextResponse = {
        name: nextProps.name,
        selected: nextProps.selected,
        property: nextProps.property
    };
    return _.isEqual(prevResponse, nextResponse);
}
WFDraggableListItem.propTypes = {
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    property: PropTypes.object.isRequired
}

export default memo(WFDraggableListItem, areEqual);

