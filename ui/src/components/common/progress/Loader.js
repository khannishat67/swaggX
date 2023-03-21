import React from 'react';
import WFCircularProgress from './CircularProgress';
import './Loader.less';

export default () => {
    return (
        <div className="body-container loader-container">
            <div className="progress">
                <WFCircularProgress/>
            </div>
        </div>
    );
}
