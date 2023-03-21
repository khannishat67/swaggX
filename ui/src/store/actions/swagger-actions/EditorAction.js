import {
    EDITOR_ACTION_UPDATE_SWAGGER,
    EDITOR_ACTION_RESET_SWAGGER
} from '../Constants';

export const updateSwagger = (data) => {
    return {

        type: EDITOR_ACTION_UPDATE_SWAGGER,
        payload: data
    }
}
export const resetSwagger = () => {
    return {
        type: EDITOR_ACTION_RESET_SWAGGER
    }
}