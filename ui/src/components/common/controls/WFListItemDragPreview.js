import React from 'react';
import './WFListItemDragPreview.less';

export default (props) => {
    return (
        <div className="drag-preview-container">
            <label>{props.property.name}</label>
        </div>
    );
}
