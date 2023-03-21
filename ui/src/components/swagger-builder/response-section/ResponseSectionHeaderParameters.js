import React, { memo, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as resourceConfig from '../../../resources/resource-strings.json';
import AddBtn from '../../common/add-btn/AddBtn';
import WFDropZone from '../../common/controls/WFDropZone';
import ParameterBody from '../../common/parameter/ParameterBody';
import ParameterModal from '../../common/parameter-edit-modal/ParameterEditModal';
import WFParamExpansionPanel from '../../common/controls/WFParamExpansionPanel';
import { Add } from '@material-ui/icons';
import { Button } from '@material-ui/core';

const ResponseSectionHeaderParameters = (props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const _onDrop = (dropItem) => {
        if (dropItem && dropItem.property && dropItem.property.name) {
            let paramobj = dropItem.property;
            if (!exists(paramobj)) {
                paramobj.in = 'header';
                props._addResponseParamsPath({ param: paramobj });
            }
        }
    };
    const exists = (param) => {
        let items = props.headers.filter(item => item.in === 'header' && item.name === param.name);
        if (items && items.length > 0) {
            return true;
        }
        return false;
    }
    const onAdd = () => {
        setOpen(true);
    }
    const addNew = (params) => {
        const paramobj
            = params.param;
        paramobj.in = 'header';
        props._addResponseParamsPath({ param: paramobj });
    }
    return (
        <WFParamExpansionPanel
            header={resourceConfig["path"].header_param_label}
            headerClassName="parameter-header"
            bodyClassName="parameter-body"
        >
            <div className="flex-column align-items-start w-100" >
                {open ? <ParameterModal open={open}
                    param={defaultParam}
                    disabledFields={disabledFields}
                    hiddenFields={hiddenFields}
                    _edit={addNew}
                    handleClose={handleClose} /> : null}
                <Button color="primary" variant="contained" startIcon={<Add />} onClick={onAdd}>Add</Button>
                <WFDropZone className="dropzone-container bg-accent w-100" bgColor="#fff" overColor="#ffcb8e" onDrop={_onDrop}>
                    {
                        props.headers && props.headers.length > 0 ? props.headers.map((header, index) => {
                            return (<ParameterBody
                                key={`path_${props.pathId}_${props.id}_param response${index}`}
                                view={props.view}
                                showToolbar={true}
                                param={header}
                                hiddenFields={hiddenFields}
                                _edit={props._edit}
                                _copy={props._copy}
                                _delete={props._delete}
                                _jumpToParam={props._jumpToParam}
                            />);
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
const disabledFields = ['in', 'keyName'];
const hiddenFields = ['markRef', 'keyName'];
const defaultParam = {
    in: 'header',
    required: false
};
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        view: prevProps.view,
        pathId: prevProps.pathId,
        id: prevProps.id,
        headers: prevProps.headers
    };
    const nextResponse = {
        view: nextProps.view,
        pathId: nextProps.pathId,
        id: nextProps.id,
        headers: nextProps.headers
    };
    return _.isEqual(prevResponse, nextResponse);
}
ResponseSectionHeaderParameters.propTypes = {
    view: PropTypes.string.isRequired,
    pathId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    headers: PropTypes.array
};
export default memo(ResponseSectionHeaderParameters, areEqual);