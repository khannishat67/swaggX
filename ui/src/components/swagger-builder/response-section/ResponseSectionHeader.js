import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePathResponse } from '../../../store/actions/SwaggerActions';

const ResponseSectionHeader = (props) => {
    const dispatch = useDispatch();
    const
        _onDelete = () => {
            dispatch(deletePathResponse(props.pathId, props.id));
        }
    return (
        <div className="path-delete-section">
            <div className="flex-row link-hover-effect" onClick={_onDelete}>
                <div><i className="delete-path-btn material-icons-outlined">delete</i></div>
            </div>
        </div >
    );
}
ResponseSectionHeader.propTypes = {
    id: PropTypes.string,
    pathId: PropTypes.string
};
export default memo(ResponseSectionHeader);