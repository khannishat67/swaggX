import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PathSegment.less';
import ApiSectionHeader from '../../common/api-section-header/ApiSectionHeader';
import PathExpansionPanel from '../path-expansion-panel/PathExpansionPanel';
import { addPath } from '../../../store/actions/SwaggerActions';

export default () => {
    const dispatch = useDispatch();
    const { paths } = useSelector(state => ({
        paths: state.swagger.paths.toJS()
    }));

    const [state, setState] = useState({
        view: "thumbnail"
    });
    const _onToggle = (viewType) => {
        setState((prevState) => ({
            ...prevState,
            view: viewType
        }));
    }
    const _addPath = () => {
        dispatch(addPath());
    }
    return (
        <div className="path-container">
            <ApiSectionHeader _onAddClick={_addPath} _onToggle={_onToggle} />
            
                {
                    paths.map((path, index) => {
                        return (
                            <PathExpansionPanel key={`${path.id}-path-expansion`}
                                path={path}
                                view={state.view}
                            />
                        );
                    })
                }
        </div>
    );
}