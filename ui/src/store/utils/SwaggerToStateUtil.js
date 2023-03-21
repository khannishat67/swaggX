import _ from 'lodash';
import uuid from 'uuidv4';
import { List, Map } from 'immutable';
import { InfoRecord } from '../records/InfoRecord';
import { ContactRecord } from '../records/ContactRecord';
import { LicenseRecord } from '../records/LicenseRecord';
import { SwaggerInfoRecord } from '../records/SwaggerInfoRecord';
import { PathRecord } from '../records/PathRecord';
import { ResponseRecord } from '../records/PathRecord';
import { DefinitionRecord } from '../records/DefinitionRecord';

export const swaggerToState = (swagger) => {
    swagger.vendorProps = addVendorProps(swagger);
    const state = {
        info: new InfoRecord(swagger.info),
        contact: new ContactRecord(swagger.info.contact || {}),
        license: new LicenseRecord(swagger.info.license || {}),
        base: new SwaggerInfoRecord(swagger)
    };
    const parameters = getParameters(swagger);
    const definitions = getDefinitions(swagger);
    state.parameters = immutableParams(parameters);
    state.definitions = immutableDefinitions(definitions);
    state.paths = getEditorPaths(swagger, parameters, definitions);
    return state;
}

const getParameters = (data) => {
    let parameters = [];
    const params = data.parameters;
    if (params && Object.keys(params).length > 0) {
        Object.keys(params).forEach((key) => {
            const paramObj = {
                keyName: key,
                id: uuid()
            };
            const param = params[key];
            Object.keys(param).forEach((paramKey) => {
                if (paramKey === 'enum') {
                    paramObj['values'] = param[paramKey];
                }
                else
                    paramObj[paramKey] = param[paramKey];
            });
            parameters.push(paramObj);
        });
    }
    return parameters;
}



const getEditorPaths = (data, parameters, definitions) => {
    let paths = new List([]);
    if (data.paths && Object.keys(data.paths).length > 0) {
        Object.keys(data.paths).forEach(path => {
            if (path && Object.keys(path).length > 0) {
                Object.keys(data.paths[path]).forEach(method => {
                    const methodObject = data.paths[path][method];
                    const pathObject = {
                        id: uuid(),
                        operationId: methodObject.operationId || "",
                        path: path,
                        method: method,
                        tags: methodObject.tags||[],
                        description: methodObject.description || ""
                    };
                    let vendorProps = addVendorProps(methodObject);
                    let pathParameters = addPathParameter(methodObject, parameters);
                    let pathResponses = addPathResponses(path, method, methodObject, definitions);
                    let pathRequestBody = addPathRequest(path, method, methodObject, definitions);
                    pathObject.parameters = pathParameters;
                    pathObject.responses = pathResponses;
                    pathObject.requestBody = pathRequestBody;
                    pathObject.vendorProps = vendorProps;
                    paths = paths.push(new PathRecord(pathObject));
                });
            }
        });
    }
    return paths;
}

const addVendorProps = (source) => {
    let vendorProps = new Map({});
    if (source && Object.keys(source).length > 0) {
        Object.keys(source).forEach(key => {
            if (key.startsWith('x-')) {
                vendorProps = vendorProps.set(key, source[key]);
            }
        });
    }
    return vendorProps;
}

const addPathParameter = (path, parameters) => {
    let params = new List([]);
    if (path.parameters && path.parameters.length > 0) {
        path.parameters.forEach(parameter => {
            if (parameter['$ref']) {
                const parameterKey = parameter['$ref'].substring(parameter['$ref'].lastIndexOf('/') + 1);
                let pObject = _.find(parameters, { keyName: parameterKey });
                if (pObject) {
                    let pathParam = _.cloneDeep(pObject);
                    pathParam.id = uuid();
                    pathParam.markRef = true;
                    let paramMap = new Map(pathParam);
                    params = params.push(paramMap);
                }
            }
            else if (!parameter['schema']) {
                let pathParam = _.cloneDeep(parameter);
                pathParam.id = uuid();
                pathParam.markRef = false;
                if (parameter.enum) {
                    pathParam.values = parameter.enum;
                    pathParam = _.omit(pathParam, ['enum']);
                }
                let paramMap = new Map(pathParam);
                params = params.push(paramMap);
            }
        });
    }
    return params;
}

const addPathRequest = (pathKey, method, path, definitions) => {
    let request = new Map({});
    if (path.parameters && path.parameters.length > 0) {
        path.parameters.forEach(parameter => {
            if (parameter['schema']) {
                let isArray = false;
                let defURI = undefined;
                if (parameter['schema']['$ref']) {
                    defURI = parameter['schema']['$ref'];
                }
                else if (parameter['schema'].items && parameter['schema'].items['$ref']) {
                    defURI = parameter['schema'].items['$ref'];
                    isArray = true;
                }
                else {
                    defURI = `#/definitions/${defaultDefName('request', pathKey, method)}`;
                }
                if (defURI) {
                    const defKey = defURI.substring(defURI.lastIndexOf('/') + 1);
                    const def = _.find(definitions, { key: defKey });
                    if (def) {
                        let reqObj = { ...def, id: uuid() };
                        if(isArray) {
                            reqObj = {...reqObj, type:'array'}
                        }
                        request = new Map({ ...reqObj });
                    }
                }
            }
        });
    }
    return request;
}

const addPathResponses = (pathKey, method, path, definitions) => {
    const responses = [];
    if (path.responses && Object.keys(path.responses).length > 0) {
        Object.keys(path.responses).forEach(responseCode => {
            let responseObj = {
                id: uuid(),
                code: responseCode,
                description: path.responses[responseCode].description
            };
            let headers = [];
            if (path.responses[responseCode].headers && Object.keys(path.responses[responseCode].headers).length > 0) {
                Object.keys(path.responses[responseCode].headers).forEach(headerKey => {
                    const header = path.responses[responseCode].headers[headerKey];
                    const paramObj = {
                        id: uuid(),
                        name: headerKey,
                        in: 'header'
                    };
                    Object.keys(header).forEach((paramKey) => {
                        paramObj[paramKey] = header[paramKey];
                    });
                    let paramMap = new Map(paramObj);
                    headers.push(paramMap);
                });
            }
            responseObj.headers = new List(headers);
            if (path.responses[responseCode].schema) {
                let defURI = undefined;
                let isArray = false;
                if (path.responses[responseCode].schema['$ref']) {
                    defURI = path.responses[responseCode].schema['$ref'];
                }
                else if (path.responses[responseCode].schema.items && path.responses[responseCode].schema.items['$ref']) {
                    defURI = path.responses[responseCode].schema.items['$ref'];
                    isArray = true;
                }
                else {
                    defURI = `#/definitions/${defaultDefName('response', pathKey, method)}`;
                }
                if (defURI) {
                    const defKey = defURI.substring(defURI.lastIndexOf('/') + 1);
                    const def = _.find(definitions, { key: defKey });
                    if (def) {
                        let resObj = { ...def, id: uuid() };
                        if(isArray) {
                            resObj = {...resObj, type:'array'}
                        }
                        responseObj.schema = new Map({ ...resObj });
                    }
                }
            }
            responses.push(new ResponseRecord(responseObj));
        });
    }
    return new List(responses);
}

const getDefinitions = (data) => {
    let definitions = [];
    if (data.paths && Object.keys(data.paths).length > 0) {
        Object.keys(data.paths).forEach(path => {
            if (path && Object.keys(path).length > 0) {
                Object.keys(data.paths[path]).forEach(method => {
                    const methodObject = data.paths[path][method];
                    const requestDefinitions = getRequestBodyDefinitions(path, method, methodObject, data.definitions);
                    if (requestDefinitions && requestDefinitions.length > 0) {
                        requestDefinitions.forEach(def => {
                            const reqDef = _.find(definitions, { key: def.key });
                            if (!reqDef) {
                                definitions.push(def);
                            }
                        });
                    }
                    const responseDefinitions = getResponseBodyDefinitions(path, method, methodObject, data.definitions);
                    if (responseDefinitions && responseDefinitions.length > 0) {
                        responseDefinitions.forEach(def => {
                            const resDef = _.find(definitions, { key: def.key });
                            if (!resDef) {
                                definitions.push(def);
                            }
                        });
                    }
                });
            }
        });
    }
    return definitions;
}

const getRequestBodyDefinitions = (pathKey, methodKey, path, defs) => {
    const definitions = [];
    if (path.parameters && path.parameters.length > 0) {
        path.parameters.forEach(parameter => {
            let defKey = undefined;
            let array = false;
            let embedded = false;
            if (parameter['schema'] && parameter['schema']['$ref']) {
                const defURI = parameter['schema']['$ref'];
                defKey = defURI.substring(defURI.lastIndexOf('/') + 1);
            }
            else if (parameter['schema'] && parameter['schema'].items && parameter['schema'].items['$ref']) {
                const defURI = parameter['schema'].items['$ref'];
                defKey = defURI.substring(defURI.lastIndexOf('/') + 1);
                array = true;
            }
            else if (parameter['schema'] && parameter['schema'].type && parameter['schema'].type === 'object') {
                embedded = true;
            }
            else if (parameter['schema'] && parameter['schema'].type && parameter['schema'].type === 'array'
                && parameter['schema'].items && parameter['schema'].items['$ref']) {
                embedded = true;
                array = true;
            }
            let paramObject = !embedded ? defs[defKey] : (!array ? parameter['schema'] : parameter['schema'].items['$ref']);
            addParamObject(paramObject, defs, definitions, { pathKey, methodKey, defKey, embedded, array, type: 'request' });
        });
    }
    return definitions;
}

const getResponseBodyDefinitions = (pathKey, methodKey, path, defs) => {
    const definitions = [];
    if (path.responses && Object.keys(path.responses).length > 0) {
        Object.keys(path.responses).forEach(responseCode => {
            let defKey = undefined;
            let array = false;
            let embedded = false;
            if (path.responses[responseCode].schema && path.responses[responseCode].schema['$ref']) {
                const defURI = path.responses[responseCode].schema['$ref'];
                defKey = defURI.substring(defURI.lastIndexOf('/') + 1);
            }
            else if (path.responses[responseCode].schema && path.responses[responseCode].schema.items && path.responses[responseCode].schema.items['$ref']) {
                const defURI = path.responses[responseCode].schema.items['$ref'];
                defKey = defURI.substring(defURI.lastIndexOf('/') + 1);
                array = true;
            }
            else if (path.responses[responseCode].schema && path.responses[responseCode].schema.type && path.responses[responseCode].schema.type === 'object') {
                embedded = true;
            }
            else if (path.responses[responseCode].schema && path.responses[responseCode].schema.type && path.responses[responseCode].schema.type === 'array'
                && path.responses[responseCode].schema.items && path.responses[responseCode].schema.items['$ref']) {
                embedded = true;
                array = true;
            }
            let paramObject = !embedded ? defs[defKey] : (!array ? path.responses[responseCode].schema : path.responses[responseCode].schema.items['$ref']);
            addParamObject(paramObject, defs, definitions, { pathKey, methodKey, defKey, embedded, array, type: 'response' });
        });
    }
    return definitions;
}

const addParamObject = (paramObject, defs, definitions, { pathKey, methodKey, defKey, embedded, array, type }) => {
    if (paramObject) {
        const defObject = {
            id: uuid(),
            key: !embedded ? defKey : defaultDefName(type, pathKey, methodKey)
        };
        defObject.type = paramObject.type || 'object';
        /*if (!array) {
            defObject.type = paramObject.type || 'object';
        }
        else {
            defObject.type = 'array';
        }*/
        defObject.description = paramObject.description || '';
        let props = [];
        addProperties(paramObject.properties, paramObject.required, null, defs, props);
        defObject.properties = props;
        definitions.push(defObject);
    }
}

const addProperties = (properties, required, parentId, defs, props) => {
    if (properties && Object.keys(properties).length > 0) {
        Object.keys(properties).forEach(propertyKey => {
            let property = _.cloneDeep(properties[propertyKey]);
            property.id = uuid();
            property.parentid = parentId;
            property.name = propertyKey;
            if (property.type && property.type === 'object') {
                addProperties(property.properties, property.required, property.id, defs, props);
            }
            else if (property['$ref']) {
                addRefProperties(property, property, defs, props);
                property = _.omit(property, ['$ref']);
            }
            else if (property.type === 'array') {
                property.array = true;
                if (property.items) {
                    if (property.items.type) {
                        property.type = property.items.type;
                    }
                    if (property.items['$ref']) {
                        addRefProperties(property.items, property, defs, props);
                    }
                    if (property.items.type && property.items.type === 'object') {
                        addProperties(property.items.properties, property.items.required, property.id, defs, props);
                    }
                }
            }
            if (property.enum && property.enum.length > 0) {
                property.values = property.enum;
                property = _.omit(property, ['enum']);
            }
            property.required = required && required.length > 0 && required.includes(propertyKey) ? true : false;
            props.push(property);
        });
    }
}

const addRefProperties = (sourceProperty, destProperty, defs, props) => {
    const defURI = sourceProperty['$ref'];
    const defKey = defURI.substring(defURI.lastIndexOf('/') + 1);
    destProperty.key = defKey;
    copyProperty(defs[defKey], destProperty);
    if (defs[defKey] && defs[defKey].properties) {
        destProperty.type = defs[defKey].type || 'object';
        destProperty = _.omit(destProperty, ['properties', 'required', '$ref']);
        addProperties(defs[defKey].properties, defs[defKey].required, destProperty.id, defs, props);
    }
    else if (defs[defKey] && defs[defKey].items && defs[defKey].items.properties) {
        destProperty.type = defs[defKey].items.type || 'object';
        destProperty.array = true;
        destProperty = _.omit(destProperty, ['properties', 'items', '$ref']);
        addProperties(defs[defKey].items.properties, defs[defKey].items.required || [], destProperty.id, defs, props);
    }
}

const copyProperty = (source, destination) => {
    if (source && Object.keys(source).length > 0) {
        Object.keys(source).forEach(key => {
            destination[key] = source[key];
        });
    }
}



const immutableParams = (params) => {
    let parameters = new List([]);
    if (params && params.length > 0) {
        params.forEach(param => {
            let paramMap = new Map(param);
            parameters = parameters.push(paramMap);
        });
    }
    return parameters;
}



const immutableDefinitions = (defs) => {
    let definitions = new List([]);
    if (defs && defs.length > 0) {
        defs.forEach(def => {
            if (def.properties && def.properties.length > 0) {
                let properties = new List([]);
                def.properties.forEach(property => {
                    properties = properties.push(new Map(property));
                });
                let newDef = _.omit(def, ['properties']);
                newDef.properties = properties;
                definitions = definitions.push(new DefinitionRecord(newDef));
            }
        });
    }
    return definitions;
}



const defaultDefName = (type, path, method) => {
    let name = `${method}${_.replace(path, new RegExp("/", "g"), "_")}_${type}`;
    return name;
}