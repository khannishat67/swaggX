import React from 'react';
import { withRouter } from 'react-router-dom';
import DDConsole from '../components/ddconsole/DDConsole';

const CosmosDDConsole = (props) => {
    return (
        <DDConsole {...props}/>
    );
}

export default withRouter(CosmosDDConsole);