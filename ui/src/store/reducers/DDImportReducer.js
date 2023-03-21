import {
    UPLOAD_SUB_CATEGORY_SUCCESS,
    UPLOAD_SUB_CATEGORY_FAILURE,
    RESET_IMPORT_STATUS
} from '../actions/Constants';

const INITIAL_STATE = {
    status: null
};
export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case UPLOAD_SUB_CATEGORY_SUCCESS:
            return { status: true };
        case UPLOAD_SUB_CATEGORY_FAILURE:
            return { status: false };
        case RESET_IMPORT_STATUS:
            return { status: null };
        default:
            return state;
    }
}