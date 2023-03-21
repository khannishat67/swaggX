import {
    SET_CONTACT, EDITOR_ACTION_UPDATE_SWAGGER,
    EDITOR_ACTION_RESET_SWAGGER
} from '../actions/Constants';
import { saveContactProperty } from '../utils/SwaggerBuilderUtil';
import { ContactRecord } from '../records/ContactRecord';

const INITIAL_STATE = new ContactRecord();

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_CONTACT:
            return saveContactProperty(state,
                action.payload.fieldName, action.payload.value);
        case EDITOR_ACTION_UPDATE_SWAGGER:
            return action.payload.contact;
        case EDITOR_ACTION_RESET_SWAGGER:
            return INITIAL_STATE;
        default:
            return state;
    }
}