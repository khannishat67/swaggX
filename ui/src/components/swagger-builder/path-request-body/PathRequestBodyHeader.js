import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { deletePath } from '../../../store/actions/SwaggerActions';

const PathRequestBodyHeader = (props) => {
    const dispatch = useDispatch();
    const _onDelete = () => {
        dispatch(deletePath(props.id));
    }
    return (
        <div className="path-delete-section">
            <div className="flex-row link-hover-effect" onClick={_onDelete}>
                <div><i className="delete-path-btn material-icons-outlined">
                    delete</i></div>
            </div>
        </div>
    );
}
const areEqual = (prevProps, nextProps) => {

    const prevResponse = {
        id: prevProps.id
    };
    const nextResponse = {
        id: nextProps.id
    };
    return _.isEqual(prevResponse, nextResponse);
}
PathRequestBodyHeader.propTypes = {
    id: PropTypes.string
};

export default memo(PathRequestBodyHeader, areEqual);