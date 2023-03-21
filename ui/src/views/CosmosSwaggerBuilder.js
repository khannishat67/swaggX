import React from 'react';
import { withRouter } from 'react-router-dom';
import LeftNavigation from '../components/swagger-builder/leftnav/LeftNavigation';
import ApiWorkflowArea from '../components/common/api-workflow-area/ApiWorkFlowArea';
import Footer from '../components/common/footer/Footer';

const CosmosSwaggerBuilder = (props) => {
    
    return (
        <div className='body-container mt-20'>
            <LeftNavigation />
            <ApiWorkflowArea {...props} />
            <Footer {...props}/>
        </div>
    )
}

export default withRouter(CosmosSwaggerBuilder);
