import { Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import * as resourceString from '../../../resources/resource-strings.json';
import { deletePath } from '../../../store/actions/SwaggerActions';

const PathExpansionPanelHeader = (props) => {
    const dispatch = useDispatch();
    const _onDelete = (event) => {
        dispatch(deletePath(props.id));
        event.stopPropagation();
    }
    const _renderHTTPMethod = () => {
        let method = resourceString["path"].http_methods[0].value;
        if (props.method)
            method = props.method;
        return (<Typography variant="subtitle1" className={"method-block-"+method}>{method.toUpperCase()}</Typography>);
    }

    const _renderPath = () => {
        if (props.path)
            return (<Typography className="ml-8">{props.path}</Typography>);
        return null;
    }
    const _renderDescription = () => {
        if (props.description)
            return (<Typography className="ml-16">{props.description}</Typography>);

        return null;
    }
    return (
        <div className="path-section-header">
            {_renderHTTPMethod()}
            {_renderPath()}
            {_renderDescription()}
            <Delete color="primary" onClick={_onDelete} className="ml-auto" />
        </div>
    );
}
export default memo(PathExpansionPanelHeader);