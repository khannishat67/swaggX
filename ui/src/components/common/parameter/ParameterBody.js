import React, { memo } from 'react';
import _ from 'lodash';
import './ParameterBody.less';
import ParameterModal from '../parameter-edit-modal/ParameterEditModal';
import ParameterHeader from './ParameterHeader';
import ParameterProperty from './ParameterProperty';
import { styleSelector } from './ParameterUtil';

const ParameterBody = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ParameterModal open={open} handleClose={handleClose} {...props} />
            <ParamView {...props} handleOpen={handleOpen} />
        </>
    );
}

const ParamView = (props) => {
        return (
            <div className="mb-8 w-100">
                <ParameterHeader {...props} handleOpen={props.handleOpen} />
            </div>
        );
}

const areEquals = (prevProps, nextProps) => {
    let prevParam = {
        param: prevProps.param,
        view: prevProps.view
    };

    let nextParam = {
        param: nextProps.param,
        view: nextProps.view
    };
    return _.isEqual(prevParam, nextParam);
}

export default memo(ParameterBody, areEquals);

