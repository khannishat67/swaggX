import { Map } from 'immutable';
import { getIn } from './CommonUtil';

export const saveParameters = (parameters, param, key) => {
    param.keyName = key || `${param.name}_${param.in.toUpperCase()}`;
    let parameter = Map({});
    parameters = addProperties(parameters, parameter, param);
    return parameters;
}

export const editPathParameters = (parameters, params) => {
    let { param } = params;
    if (param.markRef && param.markRef === true) {
        return saveParam(parameters, param);
    }
    return parameters;
}

export const copyPathParameters = (parameters, params) => {
    let { param } = params;
    return saveParam(parameters, param);
}

export const deleteParameter = (parameters, id) => {
    parameters = parameters.filterNot(item => item.get('id') === id);
    return parameters;
}

export const addParameterReference = (parameters, params) => {
    const { param } = params;
    let keyName = `${param.name}_${param.in.toUpperCase()}`;
    let filteredParams = parameters.filter(item => item.get('keyName') === keyName);
    if (filteredParams.size === 0) {
        param.keyName = keyName;
        return saveParam(parameters, param);
    }
    return parameters;
}

const saveParam = (parameters, param) => {
    let filteredParams = parameters.filter(item => item.get('id') === param.id);
    if (filteredParams.size === 0) {
        return saveParameters(parameters, param, param.keyName);
    }
    else {
        const paramIndex = parameters.findIndex(item => item.get('id') === param.id);
        let newParameter = Map({});
        parameters = parameters.update(paramIndex, (item) => {
            return addProperty(newParameter, param);
        });
    }
    return parameters;
}

const addProperties = (parameters, parameter, paramObject) => {
    parameters = parameters.push(addProperty(parameter, paramObject));
    return parameters;
}
const addProperty = (parameter, paramObject) => {
    for (let item of Object.keys(paramObject)) {
        parameter = parameter.set(item, paramObject[item]);
    }
    parameter = parameter.set('in', paramObject.in ? paramObject.in : getIn(paramObject.category));
    return parameter;
}