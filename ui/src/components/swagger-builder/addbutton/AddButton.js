import React from 'react';
import './AddButton.less';
import * as resourceString from '../../../resources/resource-strings.json';

export default (props) => {
    return (
        <div className="add-btn-container" onClick={props._onAddClick}>
            <button className="add-btn">
                <i className="material-icons-outlined add-btn-input-icon">add</i>
                <label className="add-btn-label">{resourceString.add_new_btn_label}</label>
            </button>
        </div>
    );
}