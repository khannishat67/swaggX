import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addPathResponse } from '../../../store/actions/SwaggerActions';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const PathResponseSectionHeader = (props) => {
    const dispatch = useDispatch();
    const _addResponse = () => {
        dispatch(addPathResponse(props.id));
    };
    return (
        <Button color="primary" variant='contained' startIcon={<Add />} onClick={_addResponse}>Add</Button>
    );
}
PathResponseSectionHeader.propTypes = {
    id: PropTypes.string
}
export default memo(PathResponseSectionHeader);