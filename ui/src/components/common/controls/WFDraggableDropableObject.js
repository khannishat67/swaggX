import React, { useEffect, memo } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDragSource, useDropTarget, dragStyle } from './WFDragDropHooks';

const WFDraggableDropableObject = (props) => {
    const [{ isDragging }, dragRef, preview] = useDragSource(props);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [preview]);

    const opacity = isDragging ? 0.4 : 1;

    const [{ isOver, isOverCurrent }, drop] = useDropTarget(props);

    let backgroundColor = 'rgb(255, 255, 255)';
    if (isOver || (isOverCurrent && props.greedy)) {
        backgroundColor = 'rgb(248, 216, 217)';
    }

    const attachRef = (el) => {
        dragRef(el);
        drop(el);
    }

    return (
        <div ref={attachRef}
            style={{ ...dragStyle, backgroundColor, opacity }}
            {...props}>
            {props.children}
        </div>
    );
}

const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        property: prevProps.property
    };
    const nextResponse = {
        property: nextProps.property
    };
    return _.isEqual(prevResponse, nextResponse);
}

WFDraggableDropableObject.propTypes = {
    property: PropTypes.object.isRequired
};

export default memo(WFDraggableDropableObject, areEqual);
