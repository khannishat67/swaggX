import { all } from 'redux-saga/effects';
import { watchFetchCategory, watchFetchSubCategory, watchSearchSubCategory, 
    watchUploadSubCategory,
    watchFetchSubCategoryHierarchy } from './DataDictionarySagas';

export default function* rootSaga() {

  yield all([
    watchFetchCategory(),
    watchFetchSubCategory(),
    watchSearchSubCategory(),
    watchUploadSubCategory(),
    watchFetchSubCategoryHierarchy()
  ]);

}