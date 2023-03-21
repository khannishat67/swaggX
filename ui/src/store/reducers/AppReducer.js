import { combineReducers } from 'redux';

import FileInfoReducer from './FileInfoReducer';
import InfoReducer from './InfoReducer';
import ContactReducer from './ContactReducer';
import LicenseReducer from './LicenseReducer';
import PathReducer from './PathReducer';
import ParameterReducer from './ParameterReducer';
import DefinitionReducer from './DefinitionReducer';
import SwaggerInfoReducer from './SwaggerInfoReducer';
import SwaggerReviewReducer from './SwaggerReviewReducer';
import DataDictionaryReducer from './DataDictionaryReducer';
import DefinitionTreeReducer from './DefinitionTreeReducer';
import DDImportReducer from './DDImportReducer';

const AppReducer = combineReducers({
	swagger: combineReducers({
        fileInfo:FileInfoReducer,
        info:InfoReducer,
        contact:ContactReducer,
        license:LicenseReducer,
        parameters:ParameterReducer,
        definitions:DefinitionReducer,
        basicInfo:SwaggerInfoReducer,
        paths:PathReducer
    }),
    dataDictionary:DataDictionaryReducer,
    definitionTree:DefinitionTreeReducer,
    jumpPath:SwaggerReviewReducer,
    ddImportStatus: DDImportReducer
});

export default AppReducer;