import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as resourceConfig from '../../../resources/resource-strings.json';
import DefinitionBody from '../../common/definition/DefinitionBody';
import WFSelect from '../../common/controls/WFSelect';
import WFParamExpansionPanel from '../../common/controls/WFParamExpansionPanel';
import { setPathResponse } from '../../../store/actions/SwaggerActions';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const ResponseSectionResponseBody = (props) => {
    const [def, setDef] = useState('');
    const dispatch = useDispatch();
    const { definitions } = useSelector(state => ({
        definitions: state.swagger.definitions.toJS()
    }));
    const defs = definitions.map(def => { return { id: def.key, value: def.key, label: def.key } }) || [];
    const saveResponse = (param) => {
        dispatch(setPathResponse(props.pathId, props.id, param));
    }
    const _onChange = (e) => {
        let value = e.target.value;
        setDef(value);
        console.log(def);
    }

    const _onAddResponse = () => {
        let definition = _.find(definitions, { key: def });
        saveResponse({ key: "schema", value: definition });
    }
    const _onDeleteResponse = () => { 
        setDef('');
        props._deleteResponseBody();
    }
    return (
        <WFParamExpansionPanel
            header={resourceConfig["path"].response_body}
            headerClassName="parameter-header"
            bodyClassName="parameter-body"
        >
            <div className="flex-column w-100 align-items-stretch">
                <div className="flex-row w-100">
                    <WFSelect name="response-body" className="flex-grow"
                        label={resourceConfig["path"].response_body}
                        variant="outlined"
                        labelid={`${resourceConfig["path"].response_body}-label`}
                        labelselect={`${resourceConfig["path"].response_body}-select`}
                        values={defs}
                        value={def}
                        _onChange={_onChange}
                    />
                    <IconButton onClick={_onAddResponse}>
                        <Add />
                    </IconButton>
                </div>
                <div className="dropzone-container mt-16">
                    {
                        props.schema && props.schema !== null && props.schema.key ?
                            (<DefinitionBody
                                key={`key_response_body_${props.schema.id}_$(props.id}`}
                                editable={'false'}
                                view={props.view}
                                source="response"
                                pathId={props.pathId}
                                id={props.id}
                                definition={props.schema}
                                deleteDefinition={_onDeleteResponse}
                            />) : null
                    }

                </div>
            </div >
        </WFParamExpansionPanel >
    );
}
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        pathId: prevProps.pathId,
        id: prevProps.id,
        schema: prevProps.schema,
        view: prevProps.view
    }
    const nextResponse = {
        pathid: nextProps.pathId,
        id: nextProps.id,
        schema: nextProps.schema,
        view: nextProps.view
    }
    return _.isEqual(prevResponse, nextResponse);
}
ResponseSectionResponseBody.propTypes = {
    pathId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    schema: PropTypes.object,
    view: PropTypes.string.isRequired
}
export default memo(ResponseSectionResponseBody, areEqual);