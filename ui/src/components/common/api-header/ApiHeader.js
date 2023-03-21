import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplitOutlined';
import ViewQuiltIcon from '@material-ui/icons/ViewQuiltOutlined';
import ViewWeekIcon from '@material-ui/icons/ViewWeekOutlined';
import './ApiHeader.less';
import { setFileName } from '../../../store/actions/SwaggerActions';
import * as resourceString from '../../../resources/resource-strings.json';

export default (props) => {
    const dispatch = useDispatch();
    
    const fileInfo = useSelector(state => {
        return state.swagger.fileInfo;
    });
    
    const _inputClassStyle = () => {
        return classNames('api-title-input', {
            //eslint-disable-next-line
            ['api-title-input-offfocus']: fileInfo.fileName && fileInfo.fileName !== null && fileInfo.fileName !== ""
        });
    };

    const _toolbarClassStyle = (path) => {
        return classNames('api-header-toolbar-icon material-icons-outlined', {
            //eslint-disable-next-line
            ['api-header-toolbar-icon-selected material-icons-outlined']: path === props.location.pathname
        });
    };
    const onChange = (e) => {
        dispatch(setFileName(e.target.value));
    };
    return (
        <div className="api-header">
            <div className="api-title">
                <input type="text"
                    className={_inputClassStyle()}
                    placeholder={resourceString.file_name_placeholder}
                    value={fileInfo.fileName}
                    onChange={onChange}
                />
            </div>
            <div className="api-header-toolbar">
                <label className="api-header-label">{resourceString.label_views}</label>
                <Link to="/swagger-builder"><ViewQuiltIcon className={_toolbarClassStyle("/swagger-builder")} /></Link>
                <Link to="/swagger-review"><VerticalSplitIcon className={_toolbarClassStyle("/swagger-review")} /></Link>
                <Link to="/swagger-editor" > <ViewWeekIcon className={_toolbarClassStyle("/swagger-editor")} /></Link>
            </div>
        </div>
    );

}
