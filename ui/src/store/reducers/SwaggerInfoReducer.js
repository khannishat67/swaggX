import {
    SET_SWAGGER_INFO, EDITOR_ACTION_UPDATE_SWAGGER,
    EDITOR_ACTION_RESET_SWAGGER
} from '../actions/Constants';
import { saveSwaggerInfoProperty } from '../utils/SwaggerBuilderUtil';
import { SwaggerInfoRecord } from '../records/SwaggerInfoRecord';

const INITIAL_STATE = new SwaggerInfoRecord();

export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case SET_SWAGGER_INFO:
            return saveSwaggerInfoProperty(state,
                action.payload.fieldName, action.payload.value);
        case EDITOR_ACTION_UPDATE_SWAGGER:
            return new SwaggerInfoRecord(action.payload.base);
        case EDITOR_ACTION_RESET_SWAGGER:
            return INITIAL_STATE;
        default:
            return state;
    }
}