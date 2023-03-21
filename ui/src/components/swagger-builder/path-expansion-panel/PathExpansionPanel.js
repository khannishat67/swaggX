import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import * as resourceConfig from '../../../resources/resource-strings.json';
import PathRequestBody from '../path-request-body/PathRequestBody';
import PathResponseSection from '../path-response-section/PathResponseSection';
import './PathExpansionPanel.less';
import PathExpansionPanelHeader from './PathExpansionPanelHeader';

const PathExpansionPanel = (props) => {
    const path = props.path;
    const [state, setState] = useState({
        expandPath: false
    });
    const onPathExpansionChange = (e, expanded) => {
        setState(prevState => ({
            ...prevState,
            expandPath: expanded
        }));
    }
    return (
        <div className="path-section">
            <Accordion
                TransitionProps={{ unmountOnExit: true, timeout: 10 }}
                expanded={state.expandPath}
                onChange={onPathExpansionChange}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panella-content"

                >
                    <PathExpansionPanelHeader path={path.path} id={path.id} method={path.method}
                        description={path.description} />
                </AccordionSummary>
                <AccordionDetails className="flex-column">
                    <PathRequestBody {...props} />
                    <Accordion TransitionProps={{ unmountOnExit: true, timeout: 10 }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panella-content"
                        >
                            <Typography variant='subtitle1' component={'span'}>
                                {resourceConfig["path"].response_label}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PathResponseSection {...props} />
                        </AccordionDetails>
                    </Accordion>
                </AccordionDetails>
            </Accordion>
        </div >
    );
}
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        view: prevProps.view,
        path: prevProps.path
    }
    const nextResponse = {
        view: nextProps.view,
        path: nextProps.path
    };
    return _.isEqual(prevResponse, nextResponse);
}
PathExpansionPanel.propTypes = {
    path: PropTypes.object,
    view: PropTypes.string
};
export default memo(PathExpansionPanel, areEqual);