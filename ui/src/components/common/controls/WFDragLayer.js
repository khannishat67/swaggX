import React from "react";
import { useDragLayer } from "react-dnd";
import { DragTypes } from '../../../constants/ItemTypes';
import WFListItemDragPreview from './WFListItemDragPreview';
import './WFDragLayer.less';

function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: "none"
        };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform
    };
}
export default () => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset
    } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        isDragging: monitor.isDragging(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset()
    }));

    const renderItem = () => {
        if (itemType === DragTypes.FIELD) {
            return <WFListItemDragPreview {...item} />;
        }
        return null;
    }
    if (!isDragging) {
        return null;
    }

    return (
        <div className="wf-drag-layer">
            <div style={getItemStyles(initialOffset, currentOffset)}>
                {renderItem()}
            </div>
        </div>
    );
};
