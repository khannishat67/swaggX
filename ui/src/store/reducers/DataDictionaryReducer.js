import {
    FETCH_CATEGORY_SUCCESS,
    FETCH_SUB_CATEGORY_SUCCESS,
    SEARCH_SUB_CATEGORY_SUCCESS,
    RESET_SEARCH
} from '../actions/Constants';
import { addSubCategories, searchResponse } from '../utils/DataDictionaryUtil';

const INITIAL_STATE = {
    searchResult: [],
    categories: []
};
export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case FETCH_CATEGORY_SUCCESS:
            return { searchResult: [], categories: [...action.payload.categories] };
        case FETCH_SUB_CATEGORY_SUCCESS:
            return {
                searchResult: [], categories: [...addSubCategories(state.categories,
                    action.payload.parentId, action.payload.parentCategory,
                    action.payload.children)]
            };
        case SEARCH_SUB_CATEGORY_SUCCESS:
            return {
                ...state,
                searchResult: [...searchResponse(state.categories,
                    action.payload)]
            };
        case RESET_SEARCH:
            return {
                ...state,
                searchResult: []
            };
        default:
            return state;
    }
}