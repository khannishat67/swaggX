import React, { memo } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as resourceConfig from '../../../resources/resource-strings.json';
import ParameterBody from '../../common/parameter/ParameterBody';
import WFParamExpansionPanel from '../../common/controls/WFParamExpansionPanel';

const PathRequestBodyPathParameters = (props) => {

    const hiddenFields = ['in', 'keyName', 'markRef'];

    return (
        <WFParamExpansionPanel
            header={resourceConfig["path"].path_param_label}
            headerClassName="parameter-header"
            bodyClassName="parameter-body"
        >
            <div className="dropzone-container">
                {
                    props.parameters.filter(item => item.in === 'path')
                        .map((parameter, index) => {
                            return (<ParameterBody key={`path_${props.id}_param_${parameter.id}`}
                                view={props.view}
                                _edit={props._editParamsPath}
                                _copy={props._copyParamsPath}
                                _delete={props._deleteParamsPath}
                                _jumpToParam={props._jumpToParam}
                                showToolbar={true}
                                hiddenFields={hiddenFields}
                                param={parameter} />);
                        })
                }
            </div>
        </WFParamExpansionPanel>
    );
}
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        id: prevProps.id,
        parameters: prevProps.parameters.filter(item => item.in === 'path'),
        view: prevProps.view
    };
    const nextResponse = {
        id: nextProps.id,
        parameters: nextProps.parameters.filter(item => item.in === 'path'),
        view: nextProps.view
    };
    return _.isEqual(prevResponse, nextResponse);
}
PathRequestBodyPathParameters.propTypes = {
    id: PropTypes.string,
    parameters: PropTypes.array,
    view: PropTypes.string
}
export default memo(PathRequestBodyPathParameters, areEqual)