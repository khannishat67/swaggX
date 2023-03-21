import {
    ADD_PATH, DELETE_PATH, SET_PATH, ADD_PATH_VARIABLE,
    ADD_PATH_PARAMETER, EDIT_PATH_PARAMETER, COPY_PATH_PARAMETER, DELETE_PATH_PARAMETER,
    ADD_PATH_RESPONSE, DELETE_PATH_RESPONSE, SET_PATH_RESPONSE,
    ADD_PATH_RESPONSE_PARAMETER, EDIT_PATH_RESPONSE_PARAMETER,
    COPY_PATH_RESPONSE_PARAMETER, DELETE_PATH_RESPONSE_PARAMETER,
    JUMP_TO_PARAMETER, DROP_PATH_RESPONSE,
    UPDATE_PATH_REQUEST_BODY_TYPE,
    UPDATE_PATH_RESPONSE_BODY_TYPE
} from '../Constants';

export const addPath = (path = "/", method = "get") => {
    return {
        type: ADD_PATH,
        payload: { path, method }
    }
}
export const deletePath = (id) => {
    return {
        type: DELETE_PATH,
        payload: { id }
    }
}
export const setPath = (id, params) => {
    return {
        type: SET_PATH,
        payload: { id, params }
    }
}
export const addParamsPath = (id, params) => {
    return {
        type: ADD_PATH_PARAMETER,
        payload: { id, params }
    }
}
export const addPathParam = (id, params) => {
    return {
        type: ADD_PATH_VARIABLE,
        payload: { id, params }
    }
}
export const editParamsPath = (id, params) => {
    return {
        type: EDIT_PATH_PARAMETER,
        payload: { id, params }
    }
}
export const copyParamsPath = (id, params) => {
    return {
        type: COPY_PATH_PARAMETER,
        payload: { id, params }
    }
}
export const deleteParamsPath = (id, params) => {
    return {
        type: DELETE_PATH_PARAMETER,
        payload: { id, params }
    }
}
export const dropPathResponse = (pathId, response) => {
    return {
        type: DROP_PATH_RESPONSE,
        payload: { pathId, response }
    }
}
export const addPathResponse = (pathId) => {
    return {
        type: ADD_PATH_RESPONSE,
        payload: { pathId }
    }
}
export const deletePathResponse = (pathId, responseId) => {
    return {
        type: DELETE_PATH_RESPONSE,
        payload: { pathId, responseId }
    }
}
export const setPathResponse = (pathId, responseId, params) => {
    return {
        type: SET_PATH_RESPONSE,
        payload: { pathId, responseId, params }
    }
}
export const addResponseParamsPath = (pathId, responseId, params) => {
    return {
        type: ADD_PATH_RESPONSE_PARAMETER,
        payload: { pathId, responseId, params }
    }
}
export const editResponseParamsPath = (pathId, responseId, params) => {
    return {
        type: EDIT_PATH_RESPONSE_PARAMETER,
        payload: { pathId, responseId, params }
    }
}
export const copyResponseParamsPath = (pathId, responseId, params) => {
    return {
        type: COPY_PATH_RESPONSE_PARAMETER,
        payload: { pathId, responseId, params }
    }
}
export const deleteResponseParamsPath = (pathId, responseId, params) => {
    return {
        type: DELETE_PATH_RESPONSE_PARAMETER,
        payload: { pathId, responseId, params }
    }
}

export const updatePathRequestBodyType = (pathId, isArray) => {
    return {
        type: UPDATE_PATH_REQUEST_BODY_TYPE,
        payload: { pathId, isArray }
    }
}

export const updatePathResponseBodyType = (pathId, responseId, isArray) => {
    return {
        type: UPDATE_PATH_RESPONSE_BODY_TYPE,
        payload: { pathId, responseId, isArray }
    }
}

export const jumpToParam = (pathId, responseId, params) => {
    return {

        type: JUMP_TO_PARAMETER,
        payload: { pathId, responseId, params }
    }
}