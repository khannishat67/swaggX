import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import PathRequestBodyHeaderQueryParameters from
    './PathRequestBodyHeaderQueryParameters';
import PathRequestBodyPathParameters from './PathRequestBodyPathParameters';
import PathRequestBodyBodyParameters from './PathRequestBodyBodyParameters';
import {
    setPath, addParamsPath, editParamsPath,
    copyParamsPath, deleteParamsPath, jumpToParam
} from
    '../../../store/actions/SwaggerActions';
const PathRequestBodyParameters = (props) => {
    const dispatch = useDispatch();

    const _addParamsPath = (params) => {
        dispatch(addParamsPath(props.id, params));
    }
    const _editParamsPath = (params) => {
        dispatch(editParamsPath(props.id, params));
    }
    const _copyParamsPath = (params) => {
        dispatch(copyParamsPath(props.id, params));
    }
    const _deleteParamsPath = (params) => {
        dispatch(deleteParamsPath(props.id, params));
    }
    const _jumpToParam = (params) => {
        dispatch(jumpToParam(props.id, null, params));
    }
    const _deleteRequestBody = (params) => {
        dispatch(setPath(props.id, { key: 'requestBody', value: undefined }));
    }
    const _hasPathParams = () => {
        return props.parameters.filter(item => item.in === 'path').length > 0 ? true : false;
    }
    const _showBody = () => {
        return props.method !== 'get';
    }
    return (
        <>
            {_hasPathParams() && <PathRequestBodyPathParameters
                view={props.view}
                _addParamsPath={_addParamsPath}
                _editParamsPath={_editParamsPath}
                _copyParamsPath={_copyParamsPath}
                _deleteParamsPath={_deleteParamsPath}
                _jumpToParam={_jumpToParam}
                parameters={props.parameters}
            />}
            <PathRequestBodyHeaderQueryParameters
                view={props.view}
                paramType='header'
                _addParamsPath={_addParamsPath}
                _editParamsPath={_editParamsPath}
                _copyParamsPath={_copyParamsPath}
                _deleteParamsPath={_deleteParamsPath}
                _jumpToParam={_jumpToParam}
                parameters={props.parameters}
            />
            <PathRequestBodyHeaderQueryParameters
                view={props.view}
                paramType='query'
                _addParamsPath={_addParamsPath}
                _editParamsPath={_editParamsPath}
                _copyParamsPath={_copyParamsPath}
                _deleteParamsPath={_deleteParamsPath}
                _jumpToParam={_jumpToParam}
                parameters={props.parameters}
            />
            {_showBody() && <PathRequestBodyBodyParameters
                view={props.view}
                id={props.id}
                requestBody={props.requestBody}
                _deleteRequestBody={_deleteRequestBody}
            />}
        </>
    );
}
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        id: prevProps.id,
        method: prevProps.method,
        parameters: prevProps.parameters,
        requestBody: prevProps.requestBody,
        view: prevProps.view
    };
    const nextResponse = {
        id: nextProps.id,
        method: nextProps.method,
        parameters: nextProps.parameters,
        requestBody: nextProps.requestBody,
        view: nextProps.view
    };
    return _.isEqual(prevResponse, nextResponse);
}
PathRequestBodyParameters.propTypes = {
    id: PropTypes.string.isRequired,
    parameters: PropTypes.array,
    requestBody: PropTypes.object,
    view: PropTypes.string.isRequired
};
export default memo(PathRequestBodyParameters, areEqual);