import { List } from 'immutable';
import {
  SET_DEFINITION, DELETE_DEFINITION,
  SAVE_DEFINITION_PROPERTY, DELETE_DEFINITION_PROPERTY,
  ADD_DEFINITION_HIERARCHY,
  COPY_DEFINITION_HIERARCHY,
  EDITOR_ACTION_UPDATE_SWAGGER,
  EDITOR_ACTION_RESET_SWAGGER,
  DROP_DEFINITION,
  DROP_DEFINITION_RESOURCE,
  ADD_DEFINITION_RESOURCE_PROPERTIES
} from '../actions/Constants';
import {
  saveDefinition, deleteDefinition, dropDefinition,
  saveDefinitionProperty, deleteDefinitionProperty, 
  addBatchProperty, copyDefinitionProperty,
  dropResourceDefinition, addResourceDefinitionProperties
} from '../utils/SwaggerBuilderUtil';

const INITIAL_STATE = List([]);

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_DEFINITION:
      return saveDefinition(state, action.payload);
    case DROP_DEFINITION:
      return dropDefinition(state, action.payload);
    case DELETE_DEFINITION:
      return deleteDefinition(state, action.payload.id);
    case SAVE_DEFINITION_PROPERTY:
      return saveDefinitionProperty(state, action.payload);
    case DELETE_DEFINITION_PROPERTY:
      return deleteDefinitionProperty(state, action.payload);
    case ADD_DEFINITION_HIERARCHY:
      return addBatchProperty(state, action.payload);
    case COPY_DEFINITION_HIERARCHY:
      return copyDefinitionProperty(state, action.payload);
    case DROP_DEFINITION_RESOURCE:
      return dropResourceDefinition(state, action.payload);
    case ADD_DEFINITION_RESOURCE_PROPERTIES:
      return addResourceDefinitionProperties(state, action.payload);
    case EDITOR_ACTION_UPDATE_SWAGGER:
      return action.payload.definitions;
    case EDITOR_ACTION_RESET_SWAGGER:
      return INITIAL_STATE;
    default:
      return state;
  }
}