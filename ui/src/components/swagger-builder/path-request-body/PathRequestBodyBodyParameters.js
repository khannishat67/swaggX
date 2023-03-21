import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as resourceConfig from '../../../resources/resource-strings.json';
import DefinitionBody from '../../common/definition/DefinitionBody';
import WFSelect from '../../common/controls/WFSelect';
import WFParamExpansionPanel from '../../common/controls/WFParamExpansionPanel';
import { setPath } from '../../../store/actions/SwaggerActions';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const PathRequestBodyBodyParameters = (props) => {
    const [def, setDef] = useState('');

    const dispatch = useDispatch();
    const { definitions } = useSelector(state => ({
        definitions: state.swagger.definitions.toJS()
    }));
    const defs = definitions.map(def => {
        return { id: def.key, value: def.key, label: def.key }
    }) || [];

    const _savePath = (id, params) => {
        dispatch(setPath(id, params));
    }
    const _onChange = (e) => {
        let value = e.target.value;
        setDef(value);
    }
    const _onAddRequest = () => {
        let definition = _.find(definitions, { key: def });
        _savePath(props.id, { key: "requestBody", value: definition });
    }
    const _onDeleteRequest = () => {
        setDef('');
        props._deleteRequestBody();
    }
    return (
        <WFParamExpansionPanel
            header={resourceConfig["path"].request_body}
            headerClassName="parameter-header"
            bodyClassName="parameter-body"
        >
            <div className="flex-column w-100">
                    <div className="flex-row">
                        <WFSelect name="request-body"
                            label={resourceConfig["path"].request_body}
                            labelid={`$(resourceConfig["path"].request_body}-label`}
                            labelselect={`${resourceConfig["path"].request_body}-select`}
                            values={defs}
                            value={def}
                            variant='outlined'
                            _onChange={_onChange}
                            className="w-30"
                        />
                        <IconButton onClick={_onAddRequest}>
                            <Add>add</Add>
                        </IconButton>
                    </div>
                <div className="dropzone-container">
                    {
                        props.requestBody && props.requestBody != null ?
                            (<DefinitionBody
                                key={`key_request_body_${props.id}_$(props.requestBody.id}`}
                                view={props.view}
                                source="request"
                                id={props.id}
                                editable={'false'}
                                definition={props.requestBody}
                                deleteDefinition={_onDeleteRequest}
                            />) : null
                    }
                </div>
            </div>
        </WFParamExpansionPanel>
    );
}
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        id: prevProps.id,
        requestBody: prevProps.requestBody,
        view: prevProps.view
    };
    const nextResponse = {
        id: nextProps.id,
        requestBody: nextProps.requestBody,
        view: nextProps.view
    };
    return _.isEqual(prevResponse, nextResponse);
}
PathRequestBodyBodyParameters.propTypes = {
    id: PropTypes.string.isRequired,
    requestBody: PropTypes.object,
    view: PropTypes.string.isRequired
};
export default memo(PathRequestBodyBodyParameters, areEqual);