import React from 'react';
import './PathResponseSection.less';
import PathResponseSectionHeader from './PathResponseSectionHeader';
import PathResponseSectionBody from './PathResponseSectionBody';
export default (props) => {
    return (
        <div className="flex-column align-items-start w-100">
            <PathResponseSectionHeader id={props.path.id} />
            <PathResponseSectionBody id={props.path.id} responses={props.path.responses} view={props.view} />
        </div>
    );
}