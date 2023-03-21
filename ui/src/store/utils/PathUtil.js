import { Map, List } from 'immutable';
import { PathRecord, ResponseRecord, PathParamRecord } from '../records/PathRecord';
import uuid from 'uuidv4';
import { getIn } from './CommonUtil';

export const addPath = (paths, path, method) => {
    let pathRecord = new PathRecord({ id: uuid(), path, method, operationId: method });
    paths = paths.push(pathRecord);
    return paths;
}

export const deletePath = (paths, id) => {
    paths = paths.filterNot(item => item.get('id') === id);
    return paths;
}

export const savePath = (paths, id, params) => {
    paths = paths.update(paths.findIndex(item => item.get('id') === id), (item) => {
        switch (params.key) {
            case "path":
                item = item.set(params.key, params.value);
                item = item.set('operationId', getOperationId(params.value, item.get('method')));
                break;
            case "method":
                item = item.set(params.key, params.value);
                item = item.set('operationId', getOperationId(item.get('path'), params.value));
                if (params.value === 'get') {
                    item = item.set("requestBody", null);
                }
                break;
            case "requestBody":
                if(!params.value) {
                    item = item.set(params.key, undefined);
                }
                else {
                    item = item.set(params.key, new Map({...params.value}));
                }
                break;
            default:
                item = item.set(params.key, params.value);
                break;
        }
        return item;
    });
    return paths;
}

export const updatePathRequestBodyType = (paths, id, isArray) => {
    let { pathIndex, pathRecord } = getPathRecord(paths, id);
    let requestBody = pathRecord.get("requestBody");
    if(requestBody) {
        if(isArray) {
            requestBody = requestBody.set('type', 'array');
        }
        else {
            requestBody = requestBody.set('type', 'object');
        }
        paths = paths.update(pathIndex, (item) => {
            return item.set("requestBody", requestBody);
        });
    }
    return paths;
}

export const updatePathResponseBodyType = (paths, pathId, responseId, isArray) => {
    let { pathIndex, pathRecord } = getPathRecord(paths, pathId);
    let responses = pathRecord.responses;
    responses = responses.update(responses.findIndex(item => item.get('id') === responseId), (item) => {
        let schema = item.get("schema");
        if(schema) {
            if(isArray) {
                schema = schema.set('type', 'array');
            }
            else {
                schema = schema.set('type', 'object');
            }
        }
        return item.set("schema", schema);
    });
    return updateResponses(paths, pathIndex, responses);
}

export const addPathVariable = (paths, id, params) => {
    let { pathIndex, pathRecord } = getPathRecord(paths, id);
    let parameters = pathRecord.parameters || new List([]);
    parameters = parameters.filterNot(item => item.get('in') === 'path');
    if (params && params.length > 0) {
        for (let param of params) {
            param = param.substring(1, (param.length - 1));
            let pathParamRecord = new PathParamRecord({
                id: uuid(),
                in: 'path',
                name: param,
                type: 'string',
                description: param,
                required: true
            });
            parameters = parameters.push(pathParamRecord);
        }
    }
    paths = paths.update(pathIndex, (item) => {
        return item.set("parameters", parameters);
    });
    return paths;
}

export const addParamsPath = (paths, id, params) => {
    const { param } = params;
    let { pathIndex, pathRecord } = getPathRecord(paths, id);
    let parameters = pathRecord.parameters || new List([]);
    let paramObj = Map(param);
    let parameterKey = `${param.name}_${param.in.toUpperCase()}`;
    paramObj = paramObj.set('keyName', parameterKey);
    parameters = parameters.push(paramObj);
    paths = paths.update(pathIndex, (item) => {
        return item.set("parameters", parameters);
    });
    return paths;
}

export const editParamsPath = (paths, id, params) => {
    const { param } = params;
    let { pathIndex, pathRecord } = getPathRecord(paths, id);
    let parameters = pathRecord.parameters || new List([]);
    let paramObj = Map(param);
    const paramIndex = parameters.findIndex(item => item.get('id') === param.id);
    parameters = parameters.update(paramIndex, (item) => {
        return paramObj;
    });
    paths = paths.update(pathIndex, (item) => {
        return item.set("parameters", parameters);
    });
    return paths;
}

export const copyParamsPath = (paths, id, params) => {
    const { param } = params;
    let { pathIndex, pathRecord } = getPathRecord(paths, id);
    let parameters = pathRecord.parameters || new List([]);
    let paramObj = Map(param);
    parameters = parameters.push(paramObj);
    paths = paths.update(pathIndex, (item) => {
        return item.set("parameters", parameters);
    });
    return paths;
}

export const deleteParamsPath = (paths, id, params) => {
    const { param } = params;
    let { pathIndex, pathRecord } = getPathRecord(paths, id);
    let parameters = pathRecord.parameters || new List([]);
    parameters = parameters.filterNot(item => item.get('id') === param.id);
    paths = paths.update(pathIndex, (item) => {
        return item.set("parameters", parameters);
    });
    return paths;
}

export const dropPathResponse = (paths, pathId, responseObj) => {
    let { pathIndex, pathRecord } = getPathRecord(paths, pathId);
    let responses = pathRecord.responses || new List([]);
    let responseRecord = new ResponseRecord(responseObj);
    responses = responses.push(responseRecord);
    return updateResponses(paths, pathIndex, responses);
}

export const addPathResponse = (paths, pathId) => {
    let { pathIndex, pathRecord } = getPathRecord(paths, pathId);
    let responses = pathRecord.responses || new List([]);
    let responseRecord = new ResponseRecord({ id: uuid() });
    responses = responses.push(responseRecord);
    return updateResponses(paths, pathIndex, responses);
}

export const deletePathResponse = (paths, pathId, responseId) => {
    let { pathIndex, pathRecord } = getPathRecord(paths, pathId);
    let responses = pathRecord.responses.filterNot(item => item.get('id') === responseId);
    return updateResponses(paths, pathIndex, responses);
}

export const savePathResponse = (paths, pathId, responseId, params) => {
    let { pathIndex, pathRecord } = getPathRecord(paths, pathId);
    let responses = pathRecord.responses;
    responses = responses.update(responses.findIndex(item => item.get('id') === responseId), (item) => {
        if(params.key === 'schema') {
            return item.set(params.key, new Map({...params.value}));    
        }
        return item.set(params.key, params.value);
    });
    return updateResponses(paths, pathIndex, responses);
}

export const addResponseParams = (paths, pathId, responseId, params) => {
    const { param } = params;
    let { pathIndex, pathRecord } = getPathRecord(paths, pathId);
    let responses = pathRecord.responses;
    const { responseIndex, responseRecord } = getPathResponseRecord(responses, responseId);
    let headers = responseRecord.headers || new List([]);
    let paramKey = `${param.name}_${param.category}`;
    param.keyName = paramKey;
    param.in = param.in ? param.in : getIn(param.category);
    headers = headers.push(Map(param));
    responses = responses.update(responseIndex, (item) => {
        return item.set("headers", headers);
    });
    return updateResponses(paths, pathIndex, responses);
}

export const editResponseParams = (paths, pathId, responseId, params) => {
    const { param } = params;
    let { pathIndex, pathRecord } = getPathRecord(paths, pathId);
    let responses = pathRecord.responses;
    const { responseIndex, responseRecord } = getPathResponseRecord(responses, responseId);
    let headers = responseRecord.headers || new List([]);
    const headerIndex = headers.findIndex(item => item.get('id') === param.id);
    let paramKey = param.keyName;
    param.key = paramKey;
    param.keyName = paramKey;
    headers = headers.update(headerIndex, (item) => {
        return new Map(param);
    });
    responses = responses.update(responseIndex, (item) => {
        return item.set("headers", headers);
    });
    return updateResponses(paths, pathIndex, responses);
}

export const copyResponseParams = (paths, pathId, responseId, params) => {
    const { param } = params;
    let { pathIndex, pathRecord } = getPathRecord(paths, pathId);
    let responses = pathRecord.responses;
    const { responseIndex, responseRecord } = getPathResponseRecord(responses, responseId);
    let headers = responseRecord.headers || new List([]);
    param.id = uuid();
    headers = headers.push(Map(param));
    responses = responses.update(responseIndex, (item) => {
        return item.set("headers", headers);
    });
    return updateResponses(paths, pathIndex, responses);
}

export const deleteResponseParams = (paths, pathId, responseId, params) => {
    const { param } = params;
    let { pathIndex, pathRecord } = getPathRecord(paths, pathId);
    let responses = pathRecord.responses;
    const { responseIndex, responseRecord } = getPathResponseRecord(responses, responseId);
    let headers = responseRecord.headers || new List([]);
    headers = headers.filterNot(item => item.get('id') === param.id);
    responses = responses.update(responseIndex, (item) => {
        return item.set("headers", headers);
    });
    return updateResponses(paths, pathIndex, responses);
}

export const saveEditorPaths = (data) => {
    let paths = new List([]);
    if (data.paths && Object.keys(data.paths).length > 0) {
        Object.keys(data.paths).forEach(path => {
            if (path && Object.keys(path).length > 0) {
                Object.keys(data.paths[path]).forEach(method => {
                    const methodObject = data.paths[path][method];
                    const pathObject = {
                        id: uuid(),
                        operationId: methodObject.operationId,
                        path: path,
                        method: method,
                        tags: methodObject.tags,
                        description: methodObject.description
                    };
                    paths = paths.push(new PathRecord(pathObject));
                });
            }
        });
    }
    return paths;
}

const getPathResponseRecord = (responses, id) => {
    const responseIndex = responses.findIndex(item => item.get('id') === id);
    return { responseIndex, responseRecord: responses.get(responseIndex) };
}

const getPathRecord = (paths, id) => {
    const pathIndex = paths.findIndex((item) => {
        return (item.get('id') === id);
    });
    return { pathIndex, pathRecord: paths.get(pathIndex) };
}

const updateResponses = (paths, index, responses) => {
    paths = paths.update(index, (item) => {
        return item.set("responses", responses);
    });
    return paths;
}

const getOperationId = (path, method) => {
    let opId = method;
    let pathSection = path.substring(path.lastIndexOf('/') + 1);
    if (pathSection) {
        pathSection = pathSection.replace('-', '_').replace('{', '').replace('}', '');
        opId = `${opId}_${pathSection}`;
    }
    return opId;
}