export const getIn = (category) => {
    switch (category) {
        case "HEADERS":
            return "header";
        case "PARAMETERS":
            return "query";
        case "PATH":
            return "path";
        case "BODY":
            return "body";
        default:
            return "query";
    }
}

export const filterNonSwaggerFields = (param) => {
    return Object.keys(param).filter(key => {
        return (key !== "category"
            && key !== "children"
            && key !== "children_ids"
            && key !== "editable"
            && key !== "disabled"
            && key !== "parent_ids"
            && key !== "id");
    });
}
export const filterNonSwaggerFieldsDefinitions = (param) => {
    return Object.keys(param).filter(key => {
        return (key !== "category"
            && key !== "children_ids"
            && key !== "children"
            && key !== "editable"
            && key !== "disabled"
            && key !== "parent_ids"
            && key !== "id"
            && key !== "name");
    });
}

export const getTempDefinitionKey = () => {
    return "Name";
}

export const setProperties = (container, parameterKey, keys, parameter, paramObject) => {
    for (let item of keys) {
        parameter = parameter.set(item, paramObject[item]);
    }
    container = container.set(parameterKey, parameter);
    return container;
}
export const COPY_STR = '_(copy)';