import {
    SET_FILE_NAME, SET_BASIC_INFO, SET_CONTACT, SET_LICENSE,
    SET_SWAGGER_INFO
} from '../Constants';
export const setFileName = (fileName) => {
    return {
        type: SET_FILE_NAME,
        payload: fileName
    }
}
export const setSwaggerInfo = (fieldName, value) => {

    return {
        type: SET_SWAGGER_INFO,
        payload: { fieldName, value }
    }
}

export const setBasicInfo = (fieldName, value) => {
    return {
        type: SET_BASIC_INFO,
        payload: { fieldName, value }
    }
}
export const setContactInfo = (fieldName, value) => {

    return {
        type: SET_CONTACT,
        payload: { fieldName, value }
    }
}

export const setLicenseInfo = (fieldName, value) => {

    return {
        type: SET_LICENSE,
        payload: { fieldName, value }
    }
}