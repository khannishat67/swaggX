import { ClickAwayListener } from '@material-ui/core';
import React, { useState } from 'react';

export default (props) => {
    const [showInput, setShowInput] = useState(props.showInput);

    const onBlur = () => {
        setShowInput(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setShowInput(false);
        }
    }

    const onDoubleClick = () => {
        setShowInput(true);
    }

    if (showInput && props.editable && props.editable === 'true') {
        return (<ClickAwayListener onClickAway={onBlur}><input key={`${props.textkey}_text`} type="text" {...props} onBlur={onBlur}
        onKeyDown={handleKeyDown} placeholder={props.placeHolder} autoFocus={props.autofocus} /></ClickAwayListener>);
    }
    else {
        return (<div onDoubleClick={onDoubleClick}>{props.value ? props.value : props.placeHolder}</div>);
    }
}

