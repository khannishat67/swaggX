import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';

import './WFParamExpansionPanel.less';

const WFParamExpansionPanel = (props) => {
    const [state, setState] = useState({
        expandPath: false
    });
    const onExpansionChange = (e, expanded) => {
        setState(prevState => ({
            ...prevState,
            expandPath: expanded
        }));
    }


    return (
        <Accordion
            TransitionProps={{ unmountOnExit: true, timeout: 10 }}
            expanded={state.expandPath}
            onChange={onExpansionChange}
            >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panella-content"
                className={props.headerClassName}
            >
                <Typography variant='subtitle1' component={'div'}>
                    {props.header}
                </Typography>
            </AccordionSummary>

            <AccordionDetails className={props.bodyClassName}>
                    {props.children}
            </AccordionDetails>
        </Accordion>
    );
}
export default WFParamExpansionPanel;
