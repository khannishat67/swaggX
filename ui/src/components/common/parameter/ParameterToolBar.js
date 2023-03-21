import { IconButton, Tooltip } from '@material-ui/core';
import { Delete, Edit, FileCopy, Launch } from '@material-ui/icons';
import React from 'react';
import uuid from 'uuidv4';

const COPY_STR = '_copy';
const ParameterToolBar = (props) => {
    const copyParam = () => {
        const keyName = props.param.keyName ? props.param.keyName : props.param.name;
        props._copy({
            param: {
                ...props.param, id: uuid(),
                name: `${props.param.name}${COPY_STR}`,
                keyName: `${keyName}${COPY_STR}`,
                markRef: true
            }
        });
    }

    const deleteParam = () => {
        props._delete({ param: props.param });
    }

    const jumpToParam = () => {
        props._jumpToParam({ param: props.param });
    }

    if (props.param.in === 'path') {
        return (
            <>

                <IconButton edge="end" onClick={copyParam}>
                    <FileCopy />
                </IconButton>
                <IconButton edge="end" onClick={jumpToParam}>
                    <Launch />
                </IconButton>
            </>
        );
    }
    else if (props.showToolbar && props.showToolbar === true) {
        return (
            <>
                <IconButton edge="end" onClick={copyParam}>
                    <FileCopy />
                </IconButton>
                <IconButton edge="end" onClick={props.handleOpen}>
                    <Edit />
                </IconButton>
                <IconButton edge="end" onClick={jumpToParam}>
                    <Launch />
                </IconButton>
                <IconButton edge="end" onClick={deleteParam}>
                    <Delete />
                </IconButton>
            </>
        );
    }
    else if (props.param.used !== undefined && props.param.used === false) {
        return (
            <IconButton edge="end" onClick={deleteParam}>
                <Delete />
            </IconButton>
        );
    }
    return null;
}
export default ParameterToolBar;

