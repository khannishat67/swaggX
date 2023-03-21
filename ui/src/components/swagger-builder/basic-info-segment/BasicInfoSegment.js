import { Divider, FormControl, FormControlLabel, FormGroup, FormLabel, TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as resourceString from '../../../resources/resource-strings.json';
import { setBasicInfo, setSwaggerInfo } from '../../../store/actions/SwaggerActions';
import ContactInfo from '../contact-info-segment/ContactInfoSegment';
import LicenseInfo from '../license-info-segment/LicenseInfoSegment';
import './BasicInfoSegment.less';

export default () => {
    const dispatch = useDispatch();
    const { baseInfo, info } = useSelector(state => (
        {
            baseInfo: state.swagger.basicInfo.toJS(),
            info: state.swagger.info.toJS()
        }
    ));

    const _onChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        switch (key) {
            case "host":
                dispatch(setSwaggerInfo(key, value));
                break;
            case "basePath":
                dispatch(setSwaggerInfo(key, value));
                break;
            default:
                dispatch(setBasicInfo(key, value));
                break;
        }
    };

    const _onSchemeChange = (e) => {
        let checked = e.target.checked;
        let value = e.target.value;
        let schemes = baseInfo.schemes;
        if (checked) {
            schemes =
                [...schemes, value];
        }
        else {
            schemes = _.filter(schemes, (item) => {
                return item !== value;
            });
        }
        dispatch(setSwaggerInfo("schemes", schemes));
    }

    return (
        <div className="basic-info-container" >
            <div className="info-row">
                <TextField id="info-title" name="title" label={resourceString["basic_info"].title}
                    value={info ? info.title : ""} onChange={_onChange} variant="outlined" className="w-75" />
                <TextField id="info-version" name="version" label={resourceString["basic_info"].version}
                    value={info ? info.version : ""} variant="outlined"
                    onChange={_onChange} className="w-24 ml-6" />
            </div>
            <div className="info-row">
                <TextField id="info-desc" name="description" label={resourceString["basic_info"].description}
                    className="w-100" variant="outlined" value={info ? info.description : ""} onChange={_onChange} />
            </div>
            <div className="info-row">
                <FormControl className="w-22" component='fieldset'>
                    <FormLabel component='legend' color="secondary" className="mb-8">{resourceString["basic_info"].schemes}</FormLabel>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox key={`http_scheme_checkbox`}
                                value={resourceString["basic_info"].schemes_list[0].value}
                                name='http_scheme_checkbox'
                                onChange={_onSchemeChange}
                                checked={baseInfo.schemes.includes('http')}
                                inputProps={{ 'aria-label': 'primary checkbox' }} />
                            }
                            label={resourceString["basic_info"].schemes_list[0].value}
                        />
                        <FormControlLabel
                            control={<Checkbox key={`https_scheme_checkbox`}
                                value={resourceString["basic_info"].schemes_list[1].value}
                                name='https_scheme_checkbox'
                                onChange={_onSchemeChange}
                                checked={baseInfo.schemes.includes('https')}
                                inputProps={{ 'aria-label': 'primary checkbox' }} />
                            }
                            label={resourceString["basic_info"].schemes_list[1].value}
                        />
                    </FormGroup>
                </FormControl>

                <TextField id="info-host" name="host"
                    label={resourceString["basic_info"].host}
                    value={baseInfo ? baseInfo.host : ""}
                    onChange={_onChange} variant="outlined" className="w-38" />
                <TextField id="info-base-path" name="basePath"
                    label={resourceString["basic_info"].basepath}
                    value={baseInfo ? baseInfo.basePath : ""}
                    onChange={_onChange} variant="outlined" className=" w-39 ml-6" />
            </div>
            <Divider />
            <ContactInfo />
            <Divider />
            <LicenseInfo />
        </div>
    );
}