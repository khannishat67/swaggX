import uuid from 'uuidv4';
import { List, Map } from 'immutable';

export const defaultErrorDefinition = (errorId) => {
    return {
        id: uuid(),
        key: "errors_DEF",
        description: "",
        required: new List([]),
        type: "object",
        properties: new List([
            new Map({
                array: true,
                description: "The errors object includes detailed information on the error type and impacted fields.",
                id: errorId,
                key: "error_DEF",
                name: "errors",
                parentid: null,
                required: false,
                type: "object"
            }),
            new Map({
                description: "A code describing the result of processing.",
                example: "400-008",
                id: uuid(),
                maxLength: 8,
                minLength: 7,
                name: "error_code",
                parentid: errorId,
                required: true,
                type: "string"
            }),
            new Map({
                description: "A human-readable explanation. The message is not intended for algorithmic processing and is subject to change.",
                example: "Missing required field in body",
                id: uuid(),
                maxLength: 100,
                minLength: 1,
                name: "description",
                parentid: errorId,
                required: true,
                type: "string"
            }),
            new Map({
                description: "The field name where the error occurred.",
                example: "payment_id",
                id: uuid(),
                name: "field_name",
                parentid: errorId,
                required: false,
                type: "string"
            }),
            new Map({
                description: "The field value entered in the request by the user.",
                example: 123456789,
                id: uuid(),
                name: "field_value",
                parentid: errorId,
                required: false,
                type: "string"
            }),
            new Map({
                description: "A link to the API specification.",
                example: "https://developer.wellsfargo.com/#login",
                id: uuid(),
                name: "api_specification_url",
                parentid: errorId,
                required: false,
                type: "string"
            })
        ])
    };
}