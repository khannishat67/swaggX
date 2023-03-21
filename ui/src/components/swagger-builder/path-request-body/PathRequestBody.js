import React from 'react';
import PropTypes from 'prop-types';
import './PathRequestBody.less';
import PathRequestBodyInput from './PathRequestBodyInput';
import PathRequestBodyHeader from './PathRequestBodyHeader';
import PathRequestBodyParameters from './PathRequestBodyParameters';
const PathRequestBody = (props) => {
    const path = props.path;
    console.log(path);
    return (
        <div className="flex-column">
            {/* <PathRequestBodyHeader id={path.id} /> */}
            <PathRequestBodyInput
                id={path.id}
                path={path.path}
                method={path.method}
                description={path.description}
            />
            <PathRequestBodyParameters
                id={path.id}
                method={path.method}
                parameters={path.parameters}
                requestBody={path.requestBody}
                view={props.view}
            />
        </div>
    );
}
PathRequestBody.propTypes = {
    path: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired
};
export default PathRequestBody;