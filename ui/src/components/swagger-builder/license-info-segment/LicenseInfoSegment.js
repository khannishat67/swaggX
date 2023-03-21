import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as resourceString from '../../../resources/resource-strings.json';
import { setLicenseInfo } from '../../../store/actions/SwaggerActions';
import './LicenseInfoSegment.less';

export default () => {
    const dispatch = useDispatch();
    const { license } = useSelector(state => (
        {
            license: state.swagger.license.toJS()
        }
    ));

    const _onChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        switch (key) {
            case "name":
                dispatch(setLicenseInfo(key, value));
                break;
            case "url":
                dispatch(setLicenseInfo(key, value));
                break;
            default:
                break;
        }
    };

    return (
        <div className="license-container mt-16">
            <Typography variant="subtitle1" className="mb-8">
                {resourceString["basic_info"].license}
            </Typography>
            <div className="info-row">
                <TextField id="license-name" name="name"
                    label={resourceString["basic_info"].licenseName}
                    onChange={_onChange}
                    value={license ? license.name : ""}
                    variant="outlined"
                    className="w-49" />
                <TextField id="license-url" name="url"
                    label={resourceString["basic_info"].licenseUrl}
                    onChange={_onChange}
                    value={license ? license.url : ""}
                    variant="outlined"
                    className="w-49 ml-8" />
            </div>
        </div>
    );
}