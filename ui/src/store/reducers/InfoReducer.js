import { SET_BASIC_INFO, EDITOR_ACTION_UPDATE_SWAGGER, 
    EDITOR_ACTION_RESET_SWAGGER } from '../actions/Constants';
import { saveBasicInfoProperty } from '../utils/SwaggerBuilderUtil';
import { InfoRecord } from '../records/InfoRecord';

const INITIAL_STATE = new InfoRecord();

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_BASIC_INFO:
            return saveBasicInfoProperty(state,
                action.payload.fieldName, action.payload.value);
        case EDITOR_ACTION_UPDATE_SWAGGER:
            return action.payload.info;
        case EDITOR_ACTION_RESET_SWAGGER:
            return INITIAL_STATE;
        default:
            return state;
    }
}