import React from 'react';
import BasicInfoSegment from '../../swagger-builder/basic-info-segment/BasicInfoSegment';
import PathSegment from '../../swagger-builder/path-segment/PathSegment';
import ParameterSegment from '../../swagger-builder/parameter-segment/ParameterSegment';
import DefinitionSegment from '../../swagger-builder/definition-segment/DefinitionSegment';
import './ApiBodyArea.less';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export default (props) => {
    const _getContent = (id) => {
        switch (id) {
            case "0":
                return (<BasicInfoSegment {...props} />);
            case "1":
                return (<PathSegment {...props} />);
            case "2":
                return (<ParameterSegment {...props} />);
            case "3":
                return (<DefinitionSegment {...props} />);
            default:
                return null;
        }
    };

    return (
        <div className="api-body-container">
            {
                cards.map((entry, index) => {
                    return (
                        <Accordion key={index} TransitionProps={{ unmountOnExit: true, timeout: 300 }}>
                            <AccordionSummary expandIcon={<ExpandMore />} >
                                <Typography variant="subtitle1">{entry.label}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {_getContent(entry.id)}
                            </AccordionDetails>
                        </Accordion>
                    );
                })
            }
        </div>
    );
}


const cards = [
    {
        id: "0",
        label: "Basic Info"
    },
    {
        id: "1",
        label: "Path"
    },
    {
        id: "2",
        label: "Parameters"
    },
    {
        id: "3",
        label: "Definitions"
    }
];