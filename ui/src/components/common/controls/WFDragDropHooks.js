import { DragTypes } from '../../../constants/ItemTypes';
import { useDrag, useDrop } from 'react-dnd';


export const useDragSource = (props) => {
    const _dragStart = (item) => {
        if (props.onDragStart)
            props.onDragStart(item);
    }

    const [{ isDragging }, dragRef, preview] = useDrag({
        item: { type: DragTypes.FIELD, property: { ...props.property } },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
        begin: monitor => {
            _dragStart(props.property);
        }
    });
    return [{ isDragging }, dragRef, preview];
}

export const useDropTarget = (props) => {
    const { greedy } = props;
    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: DragTypes.FIELD,
        drop: (dropObject, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop && !greedy) {
                return;
            }
            if (props.onDrop)
                props.onDrop(dropObject);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true })
        }),
    });
    return [{ isOver, isOverCurrent }, drop];
}
export const dragStyle = {
    cursor: 'move'
};

