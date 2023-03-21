import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as resources from '../../resources/resource-strings.json';
import { resetImport, uploadSubCategory } from '../../store/actions/DataDictionaryActions';
import './DDConsole.less';

export default (props) => {
    const dispatch = useDispatch();
    const importStatus = useSelector(state => state.ddImportStatus.status);
    const [content, setContent] = useState();
    const [ddFileName, setDdFileName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (importStatus !== null) {
            if (importStatus) {
                props.history.push('/swagger-builder');
            }
            else {
                setError(resources.dd_import_error);
            }
            dispatch(resetImport());
        }
        //eslint-disable-next-line
    }, [importStatus]);

    const isEdgeBrowser = () => {

        if (window.navigator && window.navigator.userAgent
            && window.navigator.userAgent.indexOf("Edge") > -1) {
            return true;
        }
        return false;
    }

    const onChange = (e) => {
        if (typeof window.FileReader !== 'function')
            throw new Error("The file API isn't supported on this browser. ");
        let input = e.target;
        if (!input)
            throw new Error("The browser does not properly implement the event object");
        if (!input.files)
            throw new Error("This browser does not support the `files` property of the files input.")
        if (!input.files[0])
            return undefined;
        let file = input.files[0];
        setDdFileName(file.name);
        setContent(file);
    }

    const upload = () => {
        dispatch(uploadSubCategory(ddFileName, content));
    }

    const JSON_SAMPLE = (!process.env.NODE_ENV || process.env.NODE_ENV === 'local'
        || process.env.NODE_ENV === 'development')
        ? process.env.PUBLIC_URL + '/sample/DataDictionary_Sample.json'
        : 'sample/DataDictionary_Sample.json';
    const XLSX_SAMPLE = (!process.env.NODE_ENV || process.env.NODE_ENV === 'local'
        || process.env.NODE_ENV === 'development')
        ? process.env.PUBLIC_URL + '/sample/DataDictionary_Sample.xlsx'
        : 'sample/DataDictionary_Sample.xlsx';

    return (
        <Paper className="dd-console">
            
            <Typography align="center" variant="h5" className="console-header">
                    {resources.dd_tool_name}
            </Typography>
            <div className="console-body">
                <div className='home-links'>
                    <Link to={JSON_SAMPLE} target="_blank" download>
                        <Button
                            variant="contained"
                            color="primary"
                            className="btn-download"
                            endIcon={<GetAppIcon />}
                        >
                            {resources.dd_json_btn}
                        </Button>
                    </Link>
                    <Link to={XLSX_SAMPLE} target="_blank" download>
                        <Button
                            variant="contained"
                            color="primary"
                            className="btn-download"
                            endIcon={<GetAppIcon />}
                        >
                            {resources.dd_xlsx_btn}
                        </Button>
                    </Link>
                </div>
                <Input type='file' className='file-input'
                    inputProps={{
                        аcсept: '.xlsx, .xls, .json'

                    }}
                    onChange={onChange}
                />
                {isEdgeBrowser() && <label> {ddFileName}</label>}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit"
                    onClick={upload}
                    className="mt-16"
                >
                    {resources.upload_btn}
                </Button>
                {(error && error.length > 0) && <span className='error'>*{error}*</span>}
            </div>
        </Paper>
    );
}