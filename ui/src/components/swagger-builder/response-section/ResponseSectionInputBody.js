import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import WFTextField from '../../common/controls/WFTextField';
import { setPathResponse } from '../../../store/actions/SwaggerActions';
import * as resourceString from '../../../resources/resource-strings.json';
import { TextField } from '@material-ui/core';

const ResponseSectionInputBody = (props) => {
    const dispatch = useDispatch();
    const saveResponse = (param) => {
        dispatch(setPathResponse(props.pathId, props.response.id, param));
    }
    const
        _onChange = (e) => {
            let key = e.target.name;
            let value = e.target.value;
            saveResponse({ key, value });
        }
    return (
        <div className="path-request-body">
            <TextField id={`$(props.pathId}_$(props.response.id)_code`} name="code"
                type="text"
                label={resourceString["path"].code}
                value={props.response.code}
                onChange={_onChange} variant='outlined' className="w-24 mb-16" />
            <TextField id={`$(props.pathId}_$(props.response.id)_desc`} name="description"
                label={resourceString["path"].description}
                value={props.response.description}
                onChange={_onChange} variant='outlined' className="w-75 ml-6 mb-16" />
        </div>
    );
}
ResponseSectionInputBody.propTypes = {
    pathId: PropTypes.string.isRequired,
    response: PropTypes.object
};
export default memo(ResponseSectionInputBody);