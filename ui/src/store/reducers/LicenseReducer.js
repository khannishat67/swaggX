import {
    SET_LICENSE, EDITOR_ACTION_UPDATE_SWAGGER,
    EDITOR_ACTION_RESET_SWAGGER
} from '../actions/Constants';
import { saveLicenseProperty } from '../utils/SwaggerBuilderUtil';
import { LicenseRecord } from '../records/LicenseRecord';

const INITIAL_STATE = new LicenseRecord();

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_LICENSE:
            return saveLicenseProperty(state,
                action.payload.fieldName, action.payload.value);
        case EDITOR_ACTION_UPDATE_SWAGGER:
            return action.payload.license;
        case EDITOR_ACTION_RESET_SWAGGER:
            return INITIAL_STATE;
        default:
            return state;
    }
}