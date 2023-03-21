import React from 'react';
import { withRouter } from 'react-router-dom';
import Home from '../components/home/Home';

const CosmosHome = (props) => {
    return (
        <Home {...props}/>
    );
}

export default withRouter(CosmosHome);