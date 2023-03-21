import _ from 'lodash';
import { getLineNumberForPath } from '../../lib/plugins/ast/ast';

export const stateToSwagger = (state) => {
    let base = state.basicInfo.toJS();
    const { vendorProps } = base;
    base = _.omit(base, ['vendorProps']);
    return {
        ...base,
        info: { ...state.info.toJS(), contact: state.contact.toJS(), license: state.license.toJS() },
        paths: pathBuilder(state.paths.toJS()),
        parameters: parametersBuilder(state.parameters.toJS()),
        definitions: definitionBuilder(state.definitions.toJS()),
        ...vendorProps
    }
}

const definitionBuilder = (definitions) => {
    let defs = {};
    let isArrayObject = false;
    if (definitions && definitions.length > 0) {
        for (let def of definitions) {
            let defObj = undefined;
            if (def.type === 'array') {
                let items = {};
                let param = def.properties && def.properties.length > 0 ? def.properties[0] : {};
                isArrayObject = (def.properties && def.properties.length > 0)
                    ? true : false;
                if (def.properties && def.properties.length === 1) {
                    items.type = param.type;
                    if (param.type === 'object') {
                        items['$ref'] = `#/definitions/${normalizeName(param.name, param.key)}`;
                    }
                }
                else {
                    setArrayParams(param, items);
                }
                if (isArrayObject) {
                    defObj = {
                        description: def.description || '',
                        type: 'object'
                    };
                }
                else {
                    defObj = {
                        description: def.description || '',
                        type: def.type,
                        items: items
                    };
                }
            }
            else {
                defObj = {
                    description: def.description || '',
                    type: def.type
                };
            }

            let requireds = requiredFields(def.properties && def.properties.length > 0 ?
                def.properties.filter(obj => obj.parentid === null) : []);

            if (requireds && requireds.length > 0) {
                defObj.required = requireds;
            }
            let { property, childDefs } = definitionParameterBuilder(def.properties, null);
            if (def.type !== 'array' || isArrayObject) {
                defObj.properties = property;
            }
            defs[normalizeName(null, def.key)] = defObj;
            for (let childDefKey of Object.keys(childDefs)) {
                defs[normalizeName(null, childDefKey)] = childDefs[childDefKey];
            }
        }
    }
    return defs;
}

const requiredFields = (properties) => {
    let required = [];
    for (let propKey of Object.keys(properties)) {
        if (properties[propKey]
            && properties[propKey].required !== undefined
            && properties[propKey].required !== null
            && (properties[propKey].required === true || properties[propKey].required === 'true')) {
            required.push(properties[propKey].name);
        }
    }
    return required;
}

const definitionParameterBuilder = (properties, parentid) => {
    let property = {};
    let childDefs = {};
    if (properties && properties.length > 0) {
        let propertyGroup = _.groupBy(properties, 'parentid');
        let emptyObjects = _.filter(properties, (prop) =>
            prop.type === 'object' && !Object.keys(propertyGroup).includes(prop.id));
        if (emptyObjects && emptyObjects.length > 0) {
            emptyObjects.forEach((obj) => {
                propertyGroup[obj.id] = [];
            });
        }
        if (propertyGroup[parentid] && propertyGroup[parentid] !== null) {
            for (let prop of propertyGroup[parentid]) {
                property[prop.label||prop.name] = definitionParameter(prop);
            }
        }
        for (let parentId of Object.keys(propertyGroup)) {
            if (parentId) {
                let parentObject = _.find(properties, { id: parentId });
                if (parentObject) {
                    let defObject = {};
                    let propObject = {};
                    let requireds = requiredFields(propertyGroup[parentId]);
                    if (propertyGroup[parentId] && propertyGroup[parentId].length > 0) {
                        for (let childProp of propertyGroup[parentId]) {
                            propObject[childProp.label||childProp.name] = definitionParameter(childProp);
                        }
                    }
                    defObject = {
                        description: parentObject.description || '',
                        type: parentObject.type
                    };
                    if (requireds && requireds.length > 0) {
                        defObject.required = requireds;
                    }
                    defObject.properties = propObject;
                    childDefs[`${normalizeName(parentObject.name, parentObject.key)}`] 
                        = defObject;
                }
            }
        }
    }
    return { property, childDefs };
}

const definitionParameter = (param) => {
    let pObject = {};
    if (param.type === 'object') {
        if (param.array !== undefined && param.array) {
            let item = {
                '$ref': `#/definitions/${normalizeName(param.name, param.key)}`
            };
            pObject = {
                type: 'array',
                description: param.description || '',
                items: item
            };
        }
        else {
            pObject = {
                '$ref': `#/definitions/${normalizeName(param.name, param.key)}`
            };
        }
    }
    else {
        if (param.array !== undefined && param.array) {
            let item = {
                type: param.type
            };
            setArrayParams(param, item);
            pObject = {
                type: 'array',
                description: param.description || '',
                items: item
            };
        }
        else {
            pObject = param;
            normalizeParam(pObject);
            pObject = filterBlank(_.omit(pObject, NON_SWAGGER_DEFINITION_PROPERTY_FIELDS));
        }
    }
    return pObject;
}

const setArrayParams = (param, item) => {
    if (param.format && param.format !== null && param.format !== '') {
        item.format = param.format
    }
    if (param.example && param.example !== null && param.example !== '') {
        item.example = param.example
    }
    if (param.pattern && param.pattern !== null && param.pattern !== '') {
        item.pattern = param.pattern
    }
    if (param.minLength && param.minLength !== null && param.minLength !== 0) {
        item.minLength = param.minLength
    }
    if (param.maxLength && param.maxLength !== null && param.maxLength !== 0) {
        item.maxLength = param.maxLength
    }
}

const parametersBuilder = (parameters) => {
    let params = {};
    if (parameters && parameters.length > 0) {
        for (let param of parameters) {
            params[param.keyName] = parameterBuilder(param);
        }
    }
    return params;
}
const parameterBuilder = (param) => {
    let pObject = param;
    normalizeParam(pObject);
    pObject = filterBlank(_.omit(pObject, NON_SWAGGER_FIELDS));
    return pObject;
}

const normalizeParam = (pObject) => {
    for (let field of Object.keys(pObject)) {
        switch (field) {
            case 'minLength':
                pObject[field] = parseFloat(pObject[field]);
                break;
            case 'maxLength':
                pObject[field] = parseFloat(pObject[field]);
                break;
            case 'minimum':
                pObject[field] = parseFloat(pObject[field]);
                break;
            case 'maximum':
                pObject[field] = parseFloat(pObject[field]);
                break;
            case 'exclusiveMaximum':
                pObject[field] = parseBoolean(pObject[field]);
                break;
            case 'exclusiveMinimum':
                pObject[field] = parseBoolean(pObject[field]);
                break;
            case 'type':
                if (pObject.values && pObject.values.length > 0) {
                    pObject[field] = pObject[field] !== 'enum' ? pObject[field] : 'string';
                    pObject.enum = pObject.values;
                }
                break;
            default:
                break;
        }
    }
}

const pathParamBuilder = (parameters, path) => {
    let pathParams = [];
    if (parameters && parameters.length > 0) {
        for (let param of parameters) {
            if (param.in !== 'path' && (param.markRef === undefined
                || (param.markRef && param.markRef === true))) {
                let paramObj = {
                    '$ref': `#/parameters/${param.keyName}`
                };
                pathParams.push(paramObj);
            }
            else {
                pathParams.push(parameterBuilder(param));
            }
        }
    }
    if (path.requestBody && path.requestBody !== null && path.requestBody.key) {
        let schemaObj = {
            '$ref': `#/definitions/${normalizeName(null, path.requestBody.key)}`
        }
        if (path.requestBody.type && path.requestBody.type === 'array') {
            schemaObj = {
                type: 'array',
                items: {
                    '$ref': `#/definitions/${normalizeName(null, path.requestBody.key)}`
                }
            };
        }
        pathParams.push({
            in: 'body',
            name: 'body',
            required: true,
            schema: schemaObj
        });
    }
    return pathParams;
}
const pathBuilder = (paths) => {
    let swaggerPath = {};
    if (paths && paths.length > 0) {
        let pathGroups = _.groupBy(paths, 'path');
        for (let p of Object.keys(pathGroups)) {
            let pathSection = {};
            for (let section of pathGroups[p]) {
                let methodSection = {
                    operationId: section.operationId,
                    description: section.description,
                    parameters: pathParamBuilder(section.parameters, section),
                    responses: pathResponseBuilder(section.responses),
                    tags: section.tags
                };
                for (let prop of Object.keys(section.vendorProps)) {
                    if (prop.startsWith('x-')) {
                        methodSection[prop] = section.vendorProps[prop];
                    }
                }
                pathSection[section.method] = methodSection;
            }
            swaggerPath[p] = pathSection;
        }
        return swaggerPath;
    }
    return swaggerPath;
}

const pathResponseBuilder = (responses) => {
    let reponsesMap = {}
    for (let resp of responses) {
        let respObj = {
            description: resp.description,
            headers: responseHeadersBuilder(resp.headers)
        };
        if (resp.schema && resp.schema.key) {
            respObj.schema = responseSchema(resp.schema);
        }
        reponsesMap[resp.code] = respObj;
    }
    return reponsesMap;
}

const responseSchema = (schema) => {
    if (schema.type === 'array') {
        return {
            type: 'array',
            items: {
                '$ref': `#/definitions/${normalizeName(null, schema.key)}`
            }
        }
    }
    return {
        '$ref': `#/definitions/${normalizeName(null, schema.key)}`
    };
}

const responseHeadersBuilder = (parameters) => {
    let params = {};
    if (parameters && parameters.length > 0) {
        for (let param of parameters) {
            params[param.name] = responseHeaderBuilder(param);
        }
    }
    return params;
}
const responseHeaderBuilder = (param) => {
    let pObject = {};
    pObject = param;
    for (let field of Object.keys(pObject)) {
        switch (field) {
            case 'minLength':
                pObject[field] = parseFloat(pObject[field]);
                break;
            case 'maxLength':
                pObject[field] = parseFloat(pObject[field]);
                break;
            case 'minimum':
                pObject[field] = parseFloat(pObject[field]);
                break;
            case 'maximum':
                pObject[field] = parseFloat(pObject[field]);
                break;
            case 'exclusiveMaximum':
                pObject[field] = parseBoolean(pObject[field]);
                break;
            case 'exclusiveMinimum':
                pObject[field] = parseBoolean(pObject[field]);
                break;
            case 'type':
                if (pObject[field] === 'enum') {
                    pObject[field] = 'string';
                    pObject.enum = pObject.values;
                }
                break;
            default:

                break;
        }
    }
    pObject = filterBlank(_.omit(pObject, NON_SWAGGER_RESPONSE_HEADERS_FIELDS));
    return pObject;
}

const NON_SWAGGER_FIELDS = ['key', 'keyName', 'markRef', 'category', 'children', 'children_ids',
    'editable', 'disabled', 'parent_ids', 'id', 'used', 'categoryId', 'values', 'dataElement', 'label'];
const NON_SWAGGER_RESPONSE_HEADERS_FIELDS = [...NON_SWAGGER_FIELDS, 'name', 'required', 'in'];
const NON_SWAGGER_DEFINITION_PROPERTY_FIELDS = [...NON_SWAGGER_RESPONSE_HEADERS_FIELDS,
    'position', 'parentid', 'definitionId', 'array'];

export const getLine = (yamlSpec, swagger, pathDetails) => {
    let lineNum = 0;
    let paths = swagger.toJS();
    let path = _.find(paths, { id: pathDetails.pathId });
    if (pathDetails && path && path.path && path.method) {
        let pathSegment = [];
        pathSegment.push("paths");
        pathSegment.push(path.path);
        pathSegment.push(path.method);
        if (pathDetails.responseId && pathDetails.responseId !== null) {
            let response = _.find(path.responses, { id: pathDetails.responseId });
            pathSegment.push("responses");
            pathSegment.push(response.code);
            pathSegment.push("headers");
            pathSegment.push(pathDetails.params.param.name);
            lineNum = getLineNumberForPath(yamlSpec, pathSegment);
        }
        else {
            pathSegment.push("parameters");
            let { param } = pathDetails.params;
            let parameters = path.parameters;
            let index = _.findIndex(parameters, (item) => {
                return item['$ref'] === `#/parameters/${param.name}_${param.in.toUpperCase()}`
                    || (item.name === param.name && item.in === param.in);
            });
            pathSegment.push([index]);
            lineNum = getLineNumberForPath(yamlSpec, pathSegment);
        }
        return lineNum;
    }
    return 0;
}

const filterBlank = (obj) => {
    let newObj = {};
    for (let field of Object.keys(obj)) {
        switch (typeof obj[field]) {
            case 'string':
                if (obj[field] !== undefined && obj[field] !== null && obj[field] !== '') {
                    newObj[field] = obj[field];
                }
                break;
            case 'number':
                if (obj[field] !== undefined && obj[field] !== 0) {
                    newObj[field] = obj[field];
                }
                break;
            default:
                if (obj[field] !== undefined && obj[field] !== null) {
                    newObj[field] = obj[field];
                }
                break;
        }

    }
    return newObj;
}

const normalizeName = (text, key) => {
    if (key) {
        return key.replace('&', '_');
    }
    return capitalize(text).replace('&', '_');
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const parseBoolean = (val) => {
    if ((typeof val === 'string' && (val.toLowerCase() === 'true' || val.toLowerCase() === 'yes')) || val === 1)
        return true;
    else if ((typeof val === 'string' && (val.toLowerCase() === 'false' || val.toLowerCase() === 'no')) || val === 0)
        return false;
    else if(typeof val === 'boolean')
        return val;
    return null;
};