import { Record, List, Map } from 'immutable';

export const SwaggerInfoRecord = new Record({
    swagger: '2.0',
    produces: ['application/json'],
    consumes: ['application/json'],
    securityDefinitions: {
        Bearer: {
            in: 'header',
            name: 'Authorization',
            description: "",
            type: 'apiKey'
        }
    },
    security: [{ Bearer: [] }],
    basePath: '/',
    host: 'localhost',
    schemes: List(['https']),
    vendorProps: Map({})

});