import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import YAML from 'yaml';
import YAMLJS from "js-yaml";
import './CosmosSwaggerEditor.less';
import SwaggerEditor, { plugins } from 'swagger-editor';
import 'swagger-editor/dist/swagger-editor.css';
import ApiHeader from '../components/common/api-header/ApiHeader';
import { stateToSwagger } from '../store/utils/StateToSwaggerUtil';
import ValidateJsonSchemaPlugin from "../lib/plugins/json-schema-validator";
import { updateSwagger } from '../store/actions/SwaggerActions';
import { swaggerToState } from '../store/utils/SwaggerToStateUtil';

import Footer from '../components/common/footer/Footer';

class CosmosSwaggerEditor extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.editor = SwaggerEditor({
            dom_id: '#swagger-editor',
            layout: 'EditorLayout',
            spec: "",
            plugins: [...Object.values(plugins), ValidateJsonSchemaPlugin]
        });
        this._updateSpec();
        this.unsubscribe = this.editor.getStore().subscribe(this.handleChange)
    }

    componentWillUnmount() {
        this.editor = null;
        this.unsubscribe();
    }

    _updateSpec() {
        try {
            let swaggerObj = {
                basicInfo: this.props.basicInfo,
                info: this.props.info,
                contact: this.props.contact,
                license: this.props.license,
                parameters: this.props.parameters,
                definitions: this.props.definitions,
                paths: this.props.paths,
            };
            let specString = YAML.stringify(stateToSwagger(swaggerObj));
            this.setState({ content: specString });
            this.editor.specActions.updateSpec(specString);
        }
        catch (e) { }
    }

    handleChange() {
        let newValue = this.editor.getState().getIn(['spec', 'spec']);
        if (newValue !== this.state.content) {
            const newSwaggger = YAMLJS.safeLoad(newValue);
            if (newSwaggger) {
                this.props.updateSwagger(swaggerToState(newSwaggger));
            }
        }
    }

    render() {
        return (
            <>
                <div className="editor-container">
                    {/* <ApiHeader {...this.props}/> */}
                    <div id='swagger-editor'></div>
                </div>
                <Footer {...this.props} />
            </>
        );
    }
}

function mapStateToProps({ swagger }) {
    const { basicInfo, info, contact, license, paths, parameters, definitions } = swagger;
    return { basicInfo, info, contact, license, paths, parameters, definitions };
}

export default connect(mapStateToProps, { updateSwagger })(withRouter(CosmosSwaggerEditor));