import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const ResponseExpansionPanelHeader = (props) => {

    const _renderHTTPCode = () => {
        if (props.code)
            return (<Typography variant="subtitle1" className={"response-code-"+ props.code.substring(0,1)}>{props.code}</Typography>);
        return null;
    }
    const _renderDescription = () => {
        if (props.description)
            return (<Typography className="ml-8" variant="subtitle1"> {props.description}</Typography>);
        return null;
    }
    return (
        <div className="flex-row align-items-center w-100">
            {_renderHTTPCode()}
            {_renderDescription()}
        </div>
    );
}
ResponseExpansionPanelHeader.propTypes = {
    code: PropTypes.string,
    description: PropTypes.string
}
export default memo(ResponseExpansionPanelHeader) 