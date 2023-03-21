import React, { useState } from 'react';
import './DefinitionBody.less';
import DefinitionHeader from './DefinitionHeader';
import DefinitionDescription from './DefinitionDescription';
import DefinitionToolbar from './DefinitionToolbar';
import DefinitionTree from '../definition-tree/DefinitionTree';
import { Divider, Typography } from '@material-ui/core';

export default (props) => {
    const [selectedProperty, setSelectedProperty] = useState(null);

    const setSelected = (property) => {
        setSelectedProperty(property);

    }
    switch (props.view) {
        case "thumbnail":
            return (
                <div className="definition-container-thumbnail">
                    <DefinitionHeader {...props} />
                    <DefinitionSectionBody {...props}
                        selectedProperty={selectedProperty}
                        setSelectedProperty={setSelected}
                    />
                </div>
            );
        case "list":
            return (
                <div className="definition-container-list">
                    <DefinitionHeader {...props} />
                </div>
            );
        default:
            return null;
    }
}



const DefinitionSectionBody = (props) => {
    return (
        <div className="definition-body-container p-8">
            <DefinitionDescription {...props} />
            <Divider className="mt-4 mb-4" />
            <div className="flex-row align-items-center justify-content-between">
                <Typography variant="body2">Field Actions</Typography>
                <DefinitionToolbar {...props} />
            </div>
            <DefinitionTree {...props} />
        </div>
    );
}
