import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import { FETCH_CATEGORY, FETCH_SUB_CATEGORY, SEARCH_SUB_CATEGORY, 
    FETCH_SUB_CATEGORY_HIERARCHY, UPLOAD_SUB_CATEGORY } from '../actions/Constants';
import {
    fetchCategorySuccess, fetchCategoryFailures,
    fetchSubCategorySuccess, fetchSubCategoryFailure,
    searchSubCategorySuccess, searchSubCategoryFailure,
    fetchSubCategoryHierarchySuccess, fetchSubCategoryHierarchyFailure,
    uploadSubCategorySuccess, uploadSubCategoryFailure
} from '../actions/DataDictionaryActions';


const BASEPATH = (!process.env.NODE_ENV || process.env.NODE_ENV === 'local'
    || process.env.NODE_ENV === 'development')
    ? "http://localhost:8080/spectrum/" : "/spectrum/";

const CATEGORY_URL = `${BASEPATH}api/categories`;
const SUB_CATEGORY_URL = `${BASEPATH}api/subcategories`;

export function* watchFetchCategory() {
    yield takeEvery(FETCH_CATEGORY, fetchCategory);
}

function* fetchCategory() {
    try {
        const data = yield call(() => {
            return axios.get(CATEGORY_URL).then(response => {
                return response.data;
            });
        });
        yield put(fetchCategorySuccess(data));
    }
    catch (error) {
        yield put(fetchCategoryFailures(error));
    }
}

export function* watchUploadSubCategory() {
    yield takeEvery(UPLOAD_SUB_CATEGORY, uploadSubCategory);
}

function* uploadSubCategory(action) {
    try {
        const formData = new FormData();
        formData.append('file', action.payload.content);
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const data = yield call(() => {
            return axios.post(`${SUB_CATEGORY_URL}`, formData, headers).then(response => {
                return response.data;
            });
        });
        yield put(uploadSubCategorySuccess(data));
    }
    catch (error) {
        yield put(uploadSubCategoryFailure(error));
    }
}

export function* watchFetchSubCategory() {
    yield takeEvery(FETCH_SUB_CATEGORY, fetchSubCategory);
}

function* fetchSubCategory(action) {
    try {
        const data = yield call(() => {
            return axios.get(`${SUB_CATEGORY_URL}?parentId=${action.payload.parentId}`).then(response => {
                return response.data;
            });
        });
        yield put(fetchSubCategorySuccess({
            parentId: action.payload.parentId,
            parentCategory: action.payload.parentCategory,
            children: data
        }));
    }
    catch (error) {
        yield put(fetchSubCategoryFailure(error));
    }
}

export function* watchSearchSubCategory() {
    yield takeEvery(SEARCH_SUB_CATEGORY, searchSubCategory);
}

function* searchSubCategory(action) {
    try {
        const data = yield call(() => {
            return axios.get(`${SUB_CATEGORY_URL}?metaphoneText=${action.payload.text}`).then(response => {
                return response.data;
            });
        });
        yield put(searchSubCategorySuccess(data));
    }
    catch (error) {
        yield put(searchSubCategoryFailure(error));
    }
}

export function* watchFetchSubCategoryHierarchy() {
    yield takeEvery(FETCH_SUB_CATEGORY_HIERARCHY, fetchSubCategoryHierarchy);
}

function* fetchSubCategoryHierarchy(action) {
    try {
        const data = yield call(() => {
            return axios.get(`${SUB_CATEGORY_URL}?parentId=${action.payload.parent.id}`).then(response => {
                return response.data;
            });
        });
        yield put(fetchSubCategoryHierarchySuccess({
            parent: action.payload.parent,
            newParentId: action.payload.newParentId,
            definitionId: action.payload.definitionId,
            dropTarget: action.payload.dropTarget,
            children: data
        }));
    }
    catch (error) {
        yield put(fetchSubCategoryHierarchyFailure(error));
    }
}