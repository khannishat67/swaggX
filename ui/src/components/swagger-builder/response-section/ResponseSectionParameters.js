import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ResponseSectionHeaderParameters from './ResponseSectionHeaderParameters';
import ResponseSectionResponseBody from './ResponseSectionResponseBody';
import {
    setPathResponse, addResponseParamsPath, editResponseParamsPath,
    copyResponseParamsPath, deleteResponseParamsPath, jumpToParam
} from '../../../store/actions/SwaggerActions';

const ResponseSectionParameters = (props) => {
    const dispatch = useDispatch();
    const _addResponseParamsPath = (params) => {
        dispatch(addResponseParamsPath(props.pathId, props.id, params));
    }
    const _editResponseParamsPath = (params) => {
        dispatch(editResponseParamsPath(props.pathId, props.id, params));
    }
    const _copyResponseParamsPath = (params) => {
        dispatch(copyResponseParamsPath(props.pathId, props.id, params));
    }
    const _deleteResponseParamsPath = (params) => {
        dispatch(deleteResponseParamsPath(props.pathId, props.id, params));
    }
    const _jumpToParamsPath = (params) => {
        dispatch(jumpToParam(props.pathId, props.id, params));
    }
    const _deleteResponseBody = () => {
        dispatch(setPathResponse(props.pathId, props.id, { key: 'schema', value: undefined }));
    }

    return (
        <>
            <ResponseSectionHeaderParameters
                view={props.view}
                pathId={props.pathId}
                id={props.id}
                headers={props.headers}
                _edit={_editResponseParamsPath}
                _copy={_copyResponseParamsPath}
                _delete={_deleteResponseParamsPath}
                _jumpToParam={_jumpToParamsPath}
                _addResponseParamsPath={_addResponseParamsPath}
            />
            <ResponseSectionResponseBody
                view={props.view}
                pathId={props.pathId}
                id={props.id}
                schema={props.schema}
                _deleteResponseBody={_deleteResponseBody}
            />
        </>
    );
}
const areEqual =
    (prevProps, nextProps) => {

        const prevResponse = {
            view: prevProps.view,
            pathId: prevProps.pathId,
            id: prevProps.id,
            schema: prevProps.schema,
            headers: prevProps.headers
        };
        const nextResponse = {
            view: nextProps.view,
            pathId: nextProps.pathId,
            id: nextProps.id,
            schema: nextProps.schema,
            headers: nextProps.headers
        };
        return _.isEqual(prevResponse, nextResponse);
    }
ResponseSectionParameters.propTypes = {
    view: PropTypes.string.isRequired,
    pathId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    schema: PropTypes.object,
    headers: PropTypes.array
};
export default memo(ResponseSectionParameters, areEqual);
