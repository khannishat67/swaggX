import React, { memo, useState } from 'react';
import _ from 'lodash';
import uuid from 'uuidv4';
import PropTypes from 'prop-types';
import * as resourceConfig from '../../../resources/resource-strings.json';
import AddBtn from '../../common/add-btn/AddBtn';
import WFDropZone from '../../common/controls/WFDropZone';
import ParameterBody from '../../common/parameter/ParameterBody';
import ParameterModal from '../../common/parameter-edit-modal/ParameterEditModal';
import WFParamExpansionPanel from '../../common/controls/WFParamExpansionPanel';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const PathRequestBodyHeaderQueryParameters = (props) => {
    const [open, setOpen] = useState(false);
    const disabledFields = ['in', 'keyName']
    const defaultParam = {
        in: props.paramType,
        required: false
    };
    const handleClose = () => {
        setOpen(false);
    };
    const _onDrop = (dropItem) => {
        if (dropItem && dropItem.property && dropItem.property.name) {
            let paramObj = dropItem.property;
            if (!exists(paramObj)) {
                paramObj.id = uuid();
                paramObj.in = props.paramType;
                props._addParamsPath({ param: paramObj });
            }
        }
    };
    const exists = (param) => {
        let items = props.parameters.filter(item => item.in === props.paramType && item.name === param.name);
        if (items && items.length > 0) {
            return true;
        }
        return false;
    }
    const onAdd = () => {
        setOpen(true);
    }
    const addNew = (params) => {
        const paramobj = params.param;
        paramobj.id = uuid();
        paramobj.in = props.paramType;
        props._addParamsPath({ param: paramobj });
    }

    return (
        <WFParamExpansionPanel
            header={props.paramType === 'header' ? resourceConfig["path"].header_param_label : resourceConfig["path"].query_param_label}
            headerClassName="parameter-header"
            bodyClassName="parameter-body"
        >

            <div className="w-100">
                <ParameterModal open={open}
                    param={defaultParam}
                    disabledFields={disabledFields}
                    _edit={addNew}
                    handleClose={handleClose} />
                <Button color="primary" variant="contained" onClick={onAdd} startIcon={<Add />}>
                    Add
                </Button>
                <WFDropZone className="dropzone-container w-100" onDrop={_onDrop} bgColor="#fff" overColor="#ffcb8e">
                    {
                        props.parameters.length > 0 && props.parameters.some(item => item.in === props.paramType) ? props.parameters.filter(item => item.in === props.paramType)
                            .map((parameter, index) => {
                                return (<ParameterBody
                                    key={`path_${props.id}_param${parameter.id}`}
                                    view={props.view}
                                    _edit={props._editParamsPath}
                                    _copy={props._copyParamsPath}
                                    _delete={props._deleteParamsPath}
                                    _jumpToParam={props._jumpToParam}
                                    showToolbar={true}
                                    param={parameter} />);
                            }) : 
                            <div className="dragdrop-placeholder">
                                add elements or drag and drop from dictionary
                            </div>
                    }
                </WFDropZone>
            </div>
        </WFParamExpansionPanel>
    );
}
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        id: prevProps.id,
        paramType: prevProps.paramType,
        parameters: prevProps.parameters.filter(item => item.in === prevProps.paramType),
        view: prevProps.view
    };
    const nextResponse = {
        id: nextProps.id,
        paramType: nextProps.paramType,
        parameters: nextProps.parameters.filter(item => item.in === nextProps.paramType),
        view: nextProps.view
    };
    return _.isEqual(prevResponse, nextResponse);
}
PathRequestBodyHeaderQueryParameters.propTypes = {
    id: PropTypes.string,
    paramType: PropTypes.string,
    parameters: PropTypes.array,
    view: PropTypes.string
};
export default memo(PathRequestBodyHeaderQueryParameters, areEqual);
