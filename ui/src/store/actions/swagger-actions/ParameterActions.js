import {
    SET_PARAMETER,
    GET_PARAMETER,
    DELETE_PARAMETER
} from '../Constants';
export const setParameter = (param) => {
    return {
        type: SET_PARAMETER,
        payload: param
    }
}
export const getParameter = () => {
    return {
        type: GET_PARAMETER
    }
}
export const deleteParameter = (id) => {
    return {
        type: DELETE_PARAMETER,
        payload: id
    }
}