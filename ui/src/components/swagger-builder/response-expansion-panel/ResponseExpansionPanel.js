import React, { memo } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import ResponseExpansionPanelHeader from './ResponseExpansionPanelHeader';
import ResponseSection from '../response-section/ResponseSection';
import './ResponseExpansionPanel.less';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@material-ui/core';
import { Delete, ExpandMore } from '@material-ui/icons';
import { deletePathResponse } from '../../../store/actions/SwaggerActions';
import { useDispatch } from 'react-redux';

const ResponseExpansionPanel = (props) => {
    const dispatch = useDispatch();
    console.log(props)
    const _onDelete = (event) => {
            dispatch(deletePathResponse(props.pathId, props.response.id));
            event.stopPropagation();
        }
    return (
        <div className="response-section w-100">
            <Accordion TransitionProps={{ unmountOnExit: true, timeout: 10 }}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panella-content"
                >
                    <ResponseExpansionPanelHeader code={props.response.code}
                        description={props.response.description} />
                    <Delete className="ml-auto" onClick={_onDelete} />

                </AccordionSummary>
                <AccordionDetails>
                    <ResponseSection pathId={props.pathId}
                        response={props.response} view={props.view} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
const areEqual = (prevProps, nextProps) => {

    const prevResponse = {
        view: prevProps.view,
        pathId: prevProps.pathId,
        response: prevProps.response,
    };
    const nextResponse = {
        view: nextProps.view,
        path: nextProps.pathId,
        response: nextProps.response
    };
    return _.isEqual(prevResponse, nextResponse);
}
ResponseExpansionPanel.propTypes = {
    view: PropTypes.string,
    pathId: PropTypes.string,
    response: PropTypes.object
};
export default memo(ResponseExpansionPanel, areEqual);
