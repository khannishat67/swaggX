import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import YAML from "js-yaml";
import JSYAML from 'yaml';
import './CosmosSwaggerReview.less';
import ApiHeader from '../components/common/api-header/ApiHeader';
import ApiBodyArea from '../components/common/api-body/ApiBodyArea';
import SwaggerAceEditor from '../components/swagger-review/swagger-ace-editor/SwaggerAceEditor';
import { stateToSwagger, getLine } from '../store/utils/StateToSwaggerUtil';
//eslint-disable-next-line
import swagger2SchemaYaml from '!!raw-loader!../lib/plugins/json-schema-validator/swagger2-schema.yaml';
import JSONSchemaValidator from '../lib/plugins/json-schema-validator/validator';
import { updateSwagger } from '../store/actions/SwaggerActions';

import Footer from '../components/common/footer/Footer';

const swagger2Schema = YAML.safeLoad(swagger2SchemaYaml)

export const CosmosSwaggerReview = (props) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState(undefined);
    const [content, setContent] = useState('');
    const swaggerRef = useRef();
    const yamlRef = useRef();

    const swaggerObj = useSelector(state => {
        const { swagger } = state;
        return {
            basicInfo: swagger.basicInfo,
            info: swagger.info,
            contact: swagger.contact,
            license: swagger.license,
            paths: swagger.paths,
            parameters: swagger.parameters,
            definitions: swagger.definitions
        }
    });
    const jumpPath = useSelector(state => state.jumpPath);

    useEffect(() => {
        generateSwaggerYaml();
        // eslint-disable-next-line
    }, [swaggerObj]);

    useEffect(() => {
        if (swaggerRef.current && content && content !== '') {
            validate(swaggerRef.current, content);
        }
    }, [content]);


    const generateSwaggerYaml = async () => {
        const swObj = stateToSwagger(swaggerObj);
        swaggerRef.current = swObj;
        yamlRef.current = JSYAML.stringify(swObj);
        setContent(yamlRef.current);
    }

    const validate = async (jsSpec, specStr) => {
        let validator = new JSONSchemaValidator();
        let errors = validator.validateSwaggar2Spec(swagger2Schema, ["openapi-2.0"],
            { jsSpec, specStr, schemaPath: ["openapi-2.0"], source: "structure" });
        errors = errors && errors.length > 0 ?
            errors.map(error => {
                return {
                    row: error.line, column: 0,
                    type: error.level, text: error.message
                }
            }) : [];
        setErrors(errors);
    }

    const update = (data) => {
        dispatch(updateSwagger(data));
    }

    return (
        <>
            <div className="swagger-review-container">
                {/* <ApiHeader {...props} /> */}
                    <div className="builder-section">
                        <ApiBodyArea {...props} />
                    </div>
                    <div className="review-section">
                        <SwaggerAceEditor errors={errors} content={content}
                            jumpToLine={getLine(content, swaggerObj.paths, jumpPath)}
                            swagger={swaggerRef.current}
                            update={update} />
                    </div>
            </div>
            <Footer {...props} />
        </>
    );
}
export default withRouter(CosmosSwaggerReview);