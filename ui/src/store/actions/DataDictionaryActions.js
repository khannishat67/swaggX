import {
    FETCH_CATEGORY,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_FAILURE,
    FETCH_SUB_CATEGORY,
    FETCH_SUB_CATEGORY_SUCCESS,
    FETCH_SUB_CATEGORY_FAILURE,
    SEARCH_SUB_CATEGORY,
    SEARCH_SUB_CATEGORY_SUCCESS,
    SEARCH_SUB_CATEGORY_FAILURE,
    FETCH_SUB_CATEGORY_HIERARCHY,
    FETCH_SUB_CATEGORY_HIERARCHY_SUCCESS,
    FETCH_SUB_CATEGORY_HIERARCHY_FAILURE,
    RESET_SEARCH,
    UPLOAD_SUB_CATEGORY,
    UPLOAD_SUB_CATEGORY_SUCCESS,
    UPLOAD_SUB_CATEGORY_FAILURE,
    RESET_IMPORT_STATUS
} from './Constants';

export const fetchCategory = () => {
    return {
        type: FETCH_CATEGORY
    }
}

export const fetchCategorySuccess = (data) => {
    return {
        type: FETCH_CATEGORY_SUCCESS,
        payload: data
    }
}

export const fetchCategoryFailures = (error) => {
    return {
        type: FETCH_CATEGORY_FAILURE,
        payload: []
    }
}

export const fetchSubCategory = (parentId, parentCategory) => {
    return {
        type: FETCH_SUB_CATEGORY,
        payload: { parentId, parentCategory }
    }
}

export const fetchSubCategorySuccess = (data) => {
    return {
        type: FETCH_SUB_CATEGORY_SUCCESS,
        payload: data
    }
}

export const fetchSubCategoryFailure = (error) => {
    return {
        type: FETCH_SUB_CATEGORY_FAILURE,
        payload: []
    }
}

export const uploadSubCategory = (fileName, content) => {
    return {
        type: UPLOAD_SUB_CATEGORY,
        payload: { fileName, content }
    }
}

export const uploadSubCategorySuccess = (data) => {
    return {
        type: UPLOAD_SUB_CATEGORY_SUCCESS,
        payload: data
    }
}

export const uploadSubCategoryFailure = (error) => {
    return {
        type: UPLOAD_SUB_CATEGORY_FAILURE,
        payload: error
    }
}

export const searchSubCategory = (text) => {
    if (text && text.length > 2) {
        return {
            type: SEARCH_SUB_CATEGORY,
            payload: { text }
        }
    }
    else {
        return {
            type: SEARCH_SUB_CATEGORY_SUCCESS,
            payload: []
        }
    }
}

export const searchSubCategorySuccess = (data) => {
    return {
        type: SEARCH_SUB_CATEGORY_SUCCESS,
        payload: data
    }
}

export const searchSubCategoryFailure = (error) => {
    return {
        type: SEARCH_SUB_CATEGORY_FAILURE,
        payload: []
    }
}

export const fetchSubCategoryHierarchy = (parent, newParentId, definitionId, dropTarget) => {
    return {
        type: FETCH_SUB_CATEGORY_HIERARCHY,
        payload: { parent, newParentId, definitionId, dropTarget }
    }
}

export const fetchSubCategoryHierarchySuccess = (data) => {
    return {
        type: FETCH_SUB_CATEGORY_HIERARCHY_SUCCESS,
        payload: data
    }
}

export const fetchSubCategoryHierarchyFailure = (error) => {
    return {
        type: FETCH_SUB_CATEGORY_HIERARCHY_FAILURE,
        payload: []
    }
}

export const resetSearch = () => {
    return {
        type: RESET_SEARCH
    }
}

export const resetImport = () => {
    return {
        type: RESET_IMPORT_STATUS
    }
} 
