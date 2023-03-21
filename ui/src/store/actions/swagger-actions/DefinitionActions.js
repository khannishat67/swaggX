import {
    SET_DEFINITION,
    DELETE_DEFINITION,
    SAVE_DEFINITION_PROPERTY,
    DELETE_DEFINITION_PROPERTY,
    ADD_DEFINITION_HIERARCHY,
    COPY_DEFINITION_HIERARCHY,
    DROP_DEFINITION,
    DROP_DEFINITION_RESOURCE,
    ADD_DEFINITION_RESOURCE_PROPERTIES
} from '../Constants';

export const setDefinition = (id, paramObject) => {
    return {
        type: SET_DEFINITION,
        payload: { id, paramObject }
    }
}
export const dropDefinition = (paramObject) => {
    return {
        type: DROP_DEFINITION,
        payload: { paramObject }
    }
}
export const deleteDefinition = (id) => {
    return {
        type: DELETE_DEFINITION,
        payload: { id }
    }
}
export const saveDefinitionProperty = (id, paramObject) => {
    return {
        type: SAVE_DEFINITION_PROPERTY,
        payload: { id, paramObject }
    }
}
export const deleteDefinitionProperty = (id, propertyId) => {
    return {
        type: DELETE_DEFINITION_PROPERTY,
        payload: { id, propertyId }
    }
}
export const addDefinitionHierarchy = (id, newParentPropertyId, parent, subSategories) => {

    return {
        type: ADD_DEFINITION_HIERARCHY,
        payload: { id, newParentPropertyId, parent, subSategories }
    }
}
export const copyDefinitionHierarchy = (sourceDefinitionId, sourcePropertyId,
    destinationDefinitionId, parentId) => {
    return {
        type: COPY_DEFINITION_HIERARCHY,
        payload: { sourceDefinitionId, sourcePropertyId, destinationDefinitionId, parentId }
    }
}

export const dropDefinitionResource = (paramObject) => {
    return {
        type: DROP_DEFINITION_RESOURCE,
        payload: { paramObject }
    }
}

export const addResourceDefinitionProperties = (id, subCategories) => {
    return {
        type: ADD_DEFINITION_RESOURCE_PROPERTIES,
        payload: { id, subCategories }
    }
}