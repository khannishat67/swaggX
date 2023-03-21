import { List } from 'immutable';
import {
    ADD_PATH, DELETE_PATH, SET_PATH, ADD_PATH_VARIABLE,
    ADD_PATH_PARAMETER, EDIT_PATH_PARAMETER, COPY_PATH_PARAMETER, DELETE_PATH_PARAMETER,
    ADD_PATH_RESPONSE, DELETE_PATH_RESPONSE, SET_PATH_RESPONSE,
    ADD_PATH_RESPONSE_PARAMETER, EDIT_PATH_RESPONSE_PARAMETER,
    COPY_PATH_RESPONSE_PARAMETER, DELETE_PATH_RESPONSE_PARAMETER,
    EDITOR_ACTION_UPDATE_SWAGGER, EDITOR_ACTION_RESET_SWAGGER,
    DROP_PATH_RESPONSE, UPDATE_PATH_REQUEST_BODY_TYPE,
    UPDATE_PATH_RESPONSE_BODY_TYPE
} from '../actions/Constants';
import {
    addPath, deletePath, savePath, addPathVariable,
    addParamsPath, editParamsPath, copyParamsPath, deleteParamsPath,
    addPathResponse, deletePathResponse, savePathResponse,
    addResponseParams, editResponseParams, copyResponseParams,
    deleteResponseParams, dropPathResponse,
    updatePathRequestBodyType, updatePathResponseBodyType
} from '../utils/SwaggerBuilderUtil';

const INITIAL_STATE = List([]);

export default function (state = INITIAL_STATE, action = {}) {
    let payload = action.payload;
    switch (action.type) {
        case ADD_PATH:
            return addPath(state, payload.path, payload.method);
        case DELETE_PATH:
            return deletePath(state, payload.id);
        case SET_PATH:
            return savePath(state, payload.id, payload.params);
        case ADD_PATH_PARAMETER:
            return addParamsPath(state, payload.id, payload.params);
        case ADD_PATH_VARIABLE:
            return addPathVariable(state, payload.id, payload.params);
        case EDIT_PATH_PARAMETER:
            return editParamsPath(state, payload.id, payload.params);
        case COPY_PATH_PARAMETER:
            return copyParamsPath(state, payload.id, payload.params);
        case DELETE_PATH_PARAMETER:
            return deleteParamsPath(state, payload.id, payload.params);
        case DROP_PATH_RESPONSE:
            return dropPathResponse(state, payload.pathId, payload.response);
        case ADD_PATH_RESPONSE:
            return addPathResponse(state, payload.pathId);
        case DELETE_PATH_RESPONSE:
            return deletePathResponse(state, payload.pathId, payload.responseId);
        case SET_PATH_RESPONSE:
            return savePathResponse(state, payload.pathId, payload.responseId, payload.params);
        case ADD_PATH_RESPONSE_PARAMETER:
            return addResponseParams(state, payload.pathId, payload.responseId, payload.params);
        case EDIT_PATH_RESPONSE_PARAMETER:
            return editResponseParams(state, payload.pathId, payload.responseId, payload.params);
        case COPY_PATH_RESPONSE_PARAMETER:
            return copyResponseParams(state, payload.pathId, payload.responseId, payload.params);
        case DELETE_PATH_RESPONSE_PARAMETER:
            return deleteResponseParams(state, payload.pathId, payload.responseId, payload.params);
        case UPDATE_PATH_REQUEST_BODY_TYPE:
            return updatePathRequestBodyType(state, payload.pathId, payload.isArray);
        case UPDATE_PATH_RESPONSE_BODY_TYPE:
            return updatePathResponseBodyType(state, payload.pathId, payload.responseId, payload.isArray);
        case EDITOR_ACTION_UPDATE_SWAGGER:
            return payload.paths;
        case EDITOR_ACTION_RESET_SWAGGER:
            return INITIAL_STATE;
        default:
            return state;
    }
}