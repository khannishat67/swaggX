import {
    FETCH_SUB_CATEGORY_HIERARCHY_SUCCESS,
    ADD_DEFINITION_HIERARCHY,
    ADD_DEFINITION_RESOURCE_PROPERTIES
} from '../actions/Constants';

const INITIAL_STATE = {
    parent: undefined,
    sub_categories: []
};
export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case FETCH_SUB_CATEGORY_HIERARCHY_SUCCESS:
            return {
                parent: action.payload.parent, 
                newParentId: action.payload.newParentId,
                definitionId: action.payload.definitionId,
                dropTarget: action.payload.dropTarget,
                sub_categories: [...action.payload.children.subCategories]
            };
        case ADD_DEFINITION_HIERARCHY:
            return { ...INITIAL_STATE };
        case ADD_DEFINITION_RESOURCE_PROPERTIES:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
}