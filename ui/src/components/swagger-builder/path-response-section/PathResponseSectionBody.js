import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { List, Map } from 'immutable';
import _ from 'lodash';
import uuid from 'uuidv4';
import WFDropZone from '../../common/controls/WFDropZone';
import ResponseExpansionPanel from '../response-expansion-panel/ResponseExpansionPanel';

import { dropPathResponse, dropDefinition } from '../../../store/actions/SwaggerActions';
import { defaultErrorDefinition } from '../../../store/utils/ErrorDefinitionUtil';

const PathResponseSectionBody = (props) => {
    const dispatch = useDispatch();
    const { definitions } = useSelector(state => ({
        definitions: state.swagger.definitions.toJS()
    }));

    const _onDrop = (dropItem) => {
        if (dropItem && dropItem.property && dropItem.property.code) {
            const index = _.findIndex(props.responses, { code: dropItem.property.code });
            if (index < 0) {
                const headers = dropItem.property.headers.map(header => {
                    return {
                        id: uuid(),
                        in: 'header',
                        ...header
                    }
                });
                const errorId = uuid();
                const errorSchema = defaultErrorDefinition(errorId);
                const responseObj = {
                    id: uuid(),
                    code: dropItem.property.code,
                    description: dropItem.property.description,
                    schema: new Map({ ...errorSchema }),
                    headers: new List([...headers])
                };
                dispatch(dropPathResponse(props.id, responseObj));
                const defIndex =
                    _.findIndex(definitions, { key: 'errors DEF' });
                if (defIndex < 0) {
                    dispatch(dropDefinition(errorSchema));
                }
            }
        }
    };
    return (
        <WFDropZone onDrop={_onDrop} className="dropzone-container w-100" bgColor="#fff" overColor="">
            {
                props.responses && props.responses.length > 0 ? props.responses.map((response, index) => {
                    return (<ResponseExpansionPanel key={`${response.id}_path_response`}
                        pathId={props.id}
                        response={response}
                        view={props.view}
                        className="w-100"
                    />);
                }) :
                    <div className="dragdrop-placeholder">
                        add elements or drag and drop from dictionary
                    </div>
            }
        </WFDropZone>
    );
}
PathResponseSectionBody.propTypes = {
    id: PropTypes.string,
    responses: PropTypes.array,
    view: PropTypes.string
};
export default PathResponseSectionBody;