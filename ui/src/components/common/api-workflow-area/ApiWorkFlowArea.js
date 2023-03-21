import React from 'react';
import ApiHeader from '../api-header/ApiHeader';
import ApiBodyArea from '../api-body/ApiBodyArea';
import WFDraglayer from '../controls/WFDragLayer';
import Footer from '../footer/Footer';
import './ApiWorkFlowArea.less';

export default (props) => {
    return (
        <div className="wf-area">
            {/* <ApiHeader {...props} /> */}
            <ApiBodyArea {...props} />
            <WFDraglayer />
            {/* <Footer {...props}/> */}
        </div>
    );
}
