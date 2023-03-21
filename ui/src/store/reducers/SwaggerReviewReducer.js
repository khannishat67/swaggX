import { JUMP_TO_PARAMETER } from '../actions/Constants';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action = {}) {
    if (action.type === JUMP_TO_PARAMETER) {
        return { ...action.payload };
    }
    return state;
}