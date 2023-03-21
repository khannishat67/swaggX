import React from 'react';
import PropTypes from 'prop-types';
import { styleSelector, paramLabel } from '../parameter/ParameterUtil';

const ParameterEditHeader = (props) => {
    return (
        <div>
            { paramLabel(props.param)}
        </div>
    );
}

ParameterEditHeader.propTypes = {
    param: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired
};
export default ParameterEditHeader;
