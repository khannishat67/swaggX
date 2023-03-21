import { SET_FILE_NAME, EDITOR_ACTION_RESET_SWAGGER } from '../actions/Constants';
const INITIAL_STATE = {
  fileName: ""
};

export default function (state = INITIAL_STATE, action = {}) {
  if (action.type === SET_FILE_NAME) {
    return { ...state, fileName: action.payload };
  }
  else if (action.type === EDITOR_ACTION_RESET_SWAGGER) {
    return INITIAL_STATE;
  }
  return state;
}