import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import WFTextField from '../../common/controls/WFTextField';
import WFSelect from '../../common/controls/WFSelect';
import * as resourceString from '../../../resources/resource-strings.json';
import { setPath, addPathParam } from '../../../store/actions/SwaggerActions';
import { TextField } from '@material-ui/core';

const PathRequestBodyInput = (props) => {
    const dispatch = useDispatch();

    const _savePath = (id, params) => {
        dispatch(setPath(id, params));
    }
    const processPathParams = (value) => {
        const pathRegEx = /{([a-z]*[A-Z]*[a-z][A-z] *)}/g;
        let matches = value.match(pathRegEx);
        dispatch(addPathParam(props.id, matches));
    }

    const _onChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        if (key === 'path') {
            processPathParams(value);
            _savePath(props.id, { key, value });
        }
        else {
            _savePath(props.id, { key, value });
        }
    }

    return (
        <div className="path-request-body">
            <WFSelect name="method"
                label={resourceString["path"].method}
                labelid={`${resourceString["path"].method}-${props.id}-label`}
                labelselect={`${resourceString["path"].method}-select`}
                values={resourceString["path"].http_methods}
                value={props.method}
                _onChange={_onChange}
                variant='outlined'
                className="w-24 mb-16"
            />
            <TextField id={`${props.id}-path-id`} name="path"
                inputProps={{ key: `${props.id}-path` }}
                label={resourceString["path"].path}
                value={props.path}
                onChange={_onChange}
                variant='outlined' className="w-75 ml-6 mb-16" />
            <TextField id={`${props.id}-description-id`} name="description"
                inputProps={{ key: `${props.id}-description` }}
                label={resourceString["path"].description}
                value={props.description}
                onChange={_onChange}
                variant='outlined' className="w-100 mb-16" />
        </div>
    );
}
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        id: prevProps.id,
        path: prevProps.path,
        method: prevProps.method,
        description: prevProps.description
    };
    const nextResponse = {
        id: nextProps.id,
        path: nextProps.path,
        method: nextProps.method,
        description: nextProps.description
    };
    return _.isEqual(prevResponse, nextResponse);
}
PathRequestBodyInput.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    method: PropTypes.string,
    description: PropTypes.string
};
export default memo(PathRequestBodyInput, areEqual);