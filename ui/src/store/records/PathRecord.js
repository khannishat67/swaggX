import {Record, Map, List} from 'immutable';

export const PathRecord = new Record({
  id: "",
  operationId: "",
  path: "/",
  method:"get",
  description: "",
  parameters: List([]),
  responses: List([]),
  tags: List([]),
  requestBody: undefined,
  vendorProps: Map({})
});

export const ResponseRecord = new Record({
  id: "",
  code: "default",
  description: "",
  schema:Map({}),
  headers: List([])
});

export const PathParamRecord = new Record({
  id:'',
  in: 'path',
  name:'',
  type: 'string',
  description: '',
  required: true
});