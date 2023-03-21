import { Map, List } from 'immutable';
import uuid from 'uuidv4';
import { DefinitionRecord } from '../records/DefinitionRecord';
import { getTempDefinitionKey } from './CommonUtil';

export const saveDefinition = (definitions, param) => {
    let { id, paramObject } = param;
    if (!id) {
        let def = new DefinitionRecord({ id: uuid(), key: getTempDefinitionKey() });
        definitions = definitions.push(def);
    }
    else {
        let { definitionIndex } = getDefinitionRecord(definitions, id);
        definitions = definitions.update(definitionIndex, (item) => {
            return item.set(paramObject.key, paramObject.value);
        });
    }
    return definitions;
}

export const dropDefinition = (definitions, param) => {
    let { paramObject } = param;
    let def = new DefinitionRecord({ ...paramObject });
    definitions = definitions.push(def);
    return definitions;
}

export const deleteDefinition = (definitions, id) => {
    definitions = definitions.filterNot((item) => {
        return item.get('id') === id;
    });
    return definitions;
}

export const saveDefinitionProperty = (definitions, param) => {
    let { id, paramObject } = param;
    let { definitionIndex, definitionRecord } = getDefinitionRecord(definitions, id);
    let properties = definitionRecord.get('properties');
    let filteredParams = properties.filter(item => item.get('id') === paramObject.id);
    if (filteredParams.size === 0) {
        properties = properties.push(Map(paramObject));
    }
    else {
        const propertyIndex = properties.findIndex((item) => {
            return (item.get('id') === paramObject.id);
        });
        properties = properties.update(propertyIndex, (item) => {
            return Map(paramObject);
        });
    }
    definitions = definitions.update(definitionIndex, (item) => {
        return item.set("properties", properties);
    });
    return definitions;
}

export const deleteDefinitionProperty = (definitions, param) => {
    let { id, propertyId } = param;
    let { definitionIndex, definitionRecord } = getDefinitionRecord(definitions, id);
    let properties = definitionRecord.get('properties');
    properties = properties.filterNot(item => item.get('id') === propertyId || item.get('parentid') === propertyId);
    definitions = definitions.update(definitionIndex, (item) => {
        return item.set('properties', properties);
    });
    return definitions;
}

export const addBatchProperty = (definitions, { id, newParentPropertyId, parent, subSategories }) => {
    let { definitionIndex, definitionRecord } = getDefinitionRecord(definitions, id);
    let newParent = { ...parent, id: uuid(), parentid: newParentPropertyId };
    let properties = definitionRecord.properties;
    properties = properties.push(Map(newParent));
    for (let sub of subSategories) {
        properties = properties.push(Map({ ...sub, id: uuid(), parentid: newParent.id }));
    }
    definitions = definitions.update(definitionIndex, (item) => {
        return item.set("properties", properties);
    });
    return definitions;
}

export const copyDefinitionProperty = (definitions, { sourceDefinitionId, sourcePropertyId, destinationDefinitionId, parentId }) => {
    const sourceDefinition = getDefinitionRecord(definitions, sourceDefinitionId);
    const destinationDefinition = getDefinitionRecord(definitions, destinationDefinitionId);
    const sourceProperties = sourceDefinition.definitionRecord.get('properties');
    let destinationProperties = destinationDefinition.definitionRecord.get('properties');
    let newPropertyList = new List([]);
    let rootProperty = getPropertyRecord(sourceProperties, sourcePropertyId).propertyRecord;
    const newParentId = uuid();
    let newProperty = { ...rootProperty.toJS(), id: newParentId, parentid: (parentId || null) };
    newPropertyList = newPropertyList.push(new Map(newProperty));
    newPropertyList = cloneHierarchy(sourcePropertyId, newParentId, sourceProperties, newPropertyList);
    for (let newProp of newPropertyList) {
        destinationProperties = destinationProperties.push(newProp);
    }
    definitions = definitions.update(destinationDefinition.definitionIndex, (item) => {
        return item.set("properties", destinationProperties);
    });
    return definitions;
}

const cloneHierarchy = (sourceParentId, destinationParentId, propertyList, newPropertyList) => {
    const children = propertyList.filter(item => item.get('parentid') === sourceParentId);
    if (children.size > 0) {
        children.forEach(item => {
            const propertyId = item.get('id');
            const newPropertyId = uuid();
            let newProperty = { ...item.toJS(), id: newPropertyId, parentid: destinationParentId };
            newPropertyList = newPropertyList.push(new Map(newProperty));
            newPropertyList = cloneHierarchy(propertyId, newPropertyId, propertyList, newPropertyList);
        });
    }
    return newPropertyList;
}

export const dropResourceDefinition = (definitions, param) => {
    let { paramObject } = param;
    let def = new DefinitionRecord({ ...paramObject });
    definitions = definitions.push(def);
    return definitions;
}

export const addResourceDefinitionProperties = (definitions, { id, subCategories }) => {
    let { definitionIndex, definitionRecord } = getDefinitionRecord(definitions, id);
    let properties = definitionRecord.properties;
    for (let sub of subCategories) {
        properties = properties.push(Map({ ...sub, id: uuid(), parentid: null }));
    }
    definitions = definitions.update(definitionIndex, (item) => {
        return item.set("properties", properties);
    });
    return definitions;
}

const getDefinitionRecord = (definitions, id) => {
    const definitionIndex = definitions.findIndex((item) => {
        return (item.get('id') === id);
    });
    return { definitionIndex, definitionRecord: definitions.get(definitionIndex) };
}

const getPropertyRecord = (properties, id) => {
    const propertyIndex = properties.findIndex((item) => {
        return (item.get('id') === id);
    });
    return { propertyIndex, propertyRecord: properties.get(propertyIndex) };
}