import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import * as resources from '../../../resources/resource-strings.json';

const ParameterEditFooter = (props) => {
    return (
        <div className="param-modal-footer">
            <Button variant="contained" color="primary" className="save" onClick={props.onSave}>{resources.parameter.save}</Button>
            <Button variant="contained" onClick={props.handleClose} className="close">{resources.parameter.cancel}</Button>
        </div>
    );
}

ParameterEditFooter.propTypes = {
    onSave: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default ParameterEditFooter;
