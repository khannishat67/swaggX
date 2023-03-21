import React from 'react';
import PropTypes from 'prop-types';

const AddBtn = (props) => {
    return (
        <div className="flex-row link-hover-efect" onClick={props._onAddClick}>
            <div> <i className="add-path-btn material-icons-outlined">add</i></div>
            <div className="add-path-label">Add</div>
        </div>
    );
}


AddBtn.propTypes = {
    _onAddClick: PropTypes.func.isRequired
};

export default AddBtn;