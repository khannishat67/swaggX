import React, { useState } from 'react';
import { useDispatch, batch } from 'react-redux';
import YAML from "js-yaml";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';

import * as resources from '../../resources/resource-strings.json';

import { swaggerToState } from '../../store/utils/SwaggerToStateUtil';
import { updateSwagger, setFileName } from '../../store/actions/SwaggerActions';
import JSONSchemaValidator
    from '../../lib/plugins/json-schema-validator/validator';
//eslint-disable-next-line
import swagger2SchemaYaml from '!!raw-loader!../../lib/plugins/json-schema-validator/swagger2-schema.yaml';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
const swagger2Schema = YAML.safeLoad(swagger2SchemaYaml);

const ImportSwaggerModal = (props) => {
    const [modalStyle] = useState(getModalStyle);
    return (
        <Dialog
            aria-labelledby="import-swagger"
            aria-describedby="import-swagger-description"
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>
                <ImportSwaggerModalHeader {...props} />
            </DialogTitle>
            <DialogContent>
                <ImportSwaggerModalBody {...props} />
            </DialogContent>
        </Dialog >
    );
}
const ImportSwaggerModalBody = (props) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [swaggerFileName, setSwaggerFileName] = useState('');
    const [error, setError] = useState(null);

    const isValid = (content) => {

        let swagger = {};
        let isJson = true;
        try {
            swagger = JSON.parse(content);
        }
        catch (err) {
            isJson = false;
        }
        if (!isJson) {
            try {
                swagger = YAML.safeLoad(content);
            }
            catch (err) {
                setError('Invalid swagger file');
                return false;
            }
        }
        if (!swagger.swagger) {
            setError('Invalid swagger file');
            return false;
        }
        let validator = new JSONSchemaValidator();
        let errors = validator.validateSwaggar2Spec(swagger2Schema, ["openapi-2.0"],
            { swagger, content, schemaPath: ["openapi-2.0"], source: "structure" });
        if (errors && errors.length > 0) {
            setError('Invalid swagger file');
            return false;
        }
        setError(null);
        return true;
    }
    const onLoadFileHandler = (e) => {
        if (isValid(e.target.result)) {
            setContent(e.target.result);
        }
    }
    const onChange = (e) => {
        if (typeof window.FileReader !== 'function')
            throw new Error("The file API isn't supported on this browser. ");
        let input = e.target;
        if (!input)
            throw new Error("The browser does not properly implement the event object");
        if (!input.files)
            throw new Error("This browser does not support the `files` property of the files input.")
        if (!input.files[0])
            return undefined;
        let file = input.files[0];
        setSwaggerFileName(file.name);
        let fr = new FileReader();
        fr.onload = onLoadFileHandler;
        fr.readAsText(file);
    }
    const isEdgeBrowser = () => {

        if (window.navigator && window.navigator.userAgent
            && window.navigator.userAgent.indexOf("Edge") > -1) {
            return true;
        }
        return false;
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const newSwaggger = YAML.safeLoad(content);
        if (newSwaggger) {
            const newSwaggerObj = swaggerToState(newSwaggger);
            batch(() => {
                dispatch(updateSwagger(newSwaggerObj));
                dispatch(setFileName(swaggerFileName));
            });
            props.handleClose();
            props.history.push('/swagger-review');
        }
    }
    return (
        <form className="home-form" onSubmit={onSubmit}>
            <Input type='file' className='file-input'
                inputProps={{
                    аcсept: '.yaml, .json'

                }}
                onChange={onChange}
            />
            {isEdgeBrowser() && <label> {swaggerFileName}</label>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit"
            >
                {resources.upload_btn}
            </Button>
            {(error && error.length > 0) && <span className='error'>*{error}*</span>}
        </form>
    );
}
const ImportSwaggerModalHeader = (props) => {
    return (
        <div className="flex-row align-items-center justify-content-between">
            <Typography variant="subtitle1">{resources.edit_label}</Typography>
            <IconButton onClick={props.handleClose}><Close /></IconButton>
        </div>
    );
}
const getModalStyle = () => {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}
export default ImportSwaggerModal;