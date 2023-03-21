import { List } from 'immutable';
import {
    SET_PARAMETER, ADD_PATH_PARAMETER,
    EDIT_PATH_PARAMETER, COPY_PATH_PARAMETER, DELETE_PARAMETER,
    EDITOR_ACTION_UPDATE_SWAGGER,
    EDITOR_ACTION_RESET_SWAGGER
} from '../actions/Constants';
import {
    saveParameters, addParameterReference,
    editPathParameters, copyPathParameters, deleteParameter
} from '../utils/SwaggerBuilderUtil';

const INITIAL_STATE = List([]);

export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case SET_PARAMETER:
            return saveParameters(state, action.payload);
        case DELETE_PARAMETER:
            return deleteParameter(state, action.payload);
        case ADD_PATH_PARAMETER:
            return addParameterReference(state, action.payload.params);
        case EDIT_PATH_PARAMETER:
            return editPathParameters(state, action.payload.params);
        case COPY_PATH_PARAMETER:
            return copyPathParameters(state, action.payload.params);
        case EDITOR_ACTION_UPDATE_SWAGGER:
            return action.payload.parameters;
        case EDITOR_ACTION_RESET_SWAGGER:
            return INITIAL_STATE;
        default:
            return state;
    }
}