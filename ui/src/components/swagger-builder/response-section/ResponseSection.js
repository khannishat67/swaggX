import React, { memo } from 'react';
import _ from 'lodash';
import ResponseSectionHeader from './ResponseSectionHeader';
import ResponseSectionInputBody from './ResponseSectionInputBody';
import ResponseSectionParameters from './ResponseSectionParameters';
import './ResponseSection.less';

const ResponseSection =
    (props) => {
        return (
            <div className="flex-column w-100" >
                {/* <ResponseSectionHeader pathId={props.pathId} id={props.response.id} /> */}
                <ResponseSectionInputBody pathId={props.pathId} response={props.response} />
                <ResponseSectionParameters
                    view={props.view}
                    pathId={props.pathId}
                    id={props.response.id}
                    headers={props.response.headers}
                    schema={props.response.schema}
                />
            </div >
        );
    }
const areEqual = (prevProps, nextProps) => {
    const prevResponse = {
        view: prevProps.view,
        pathId: prevProps.pathId,
        response: prevProps.response
    };
    const nextResponse = {
        view: nextProps.view,
        pathId: nextProps.pathId,
        response: nextProps.response
    };
    return _.isEqual(prevResponse, nextResponse);
}
export default memo(ResponseSection, areEqual);