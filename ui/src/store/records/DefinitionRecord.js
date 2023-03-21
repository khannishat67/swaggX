import {Record, List} from 'immutable';

export const DefinitionRecord = new Record({
  id: "",
  key: "",
  description: "",
  type: "object",
  required: List([]),
  properties: List([])
});