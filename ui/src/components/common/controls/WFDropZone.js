import React from 'react';
import { useDropTarget } from './WFDragDropHooks';

export default (props) => {
    const { greedy, children } = props;
    const [{ isOver, isOverCurrent }, drop] = useDropTarget(props);

    let backgroundColor = props.bgColor;

    if (isOverCurrent || (isOver && greedy)) {
        backgroundColor = props.overColor;
    }
    return (
        <div ref={drop}
            style={{ backgroundColor: backgroundColor, margin: '16px 0' }}
            {...props}>
            {children}
        </div>
    );

}
