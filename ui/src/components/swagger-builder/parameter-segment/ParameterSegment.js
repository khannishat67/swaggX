import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import './ParameterSegment.less';
import ParameterBody from '../../common/parameter/ParameterBody';
import SwitchViewIcon from '../../common/switch-icon/SwitchViewIcon';
import { deleteParameter } from '../../../store/actions/SwaggerActions';


export default () => {
    const dispatch = useDispatch();
    const { params, paths } = useSelector(state => {
        return {
            params: state.swagger.parameters.toJS(),
            paths: state.swagger.paths.toJS()
        }
    });
    let parameters = setParamUsage(params, paths);
    const [state, setState] = useState({
        view: "thumbnail"
    });

    const _onToggle = (viewType) => {
        setState((prevState) => ({
            ...prevState,
            view: viewType
        }));
    }
    const _delete = (params) => {
        dispatch(deleteParameter(params.param.id));
    }

    return (
        <div className="flex-column">
            {/* <div className="parameter-segment-header">
                <SwitchViewIcon
                    _onToggle={_onToggle} />
            </div> */}
            <div className="flex-column">
                <div className="dropzone-container">
                    {
                        parameters.map((parameter, index) => {
                            return (<ParameterBody
                                key={`parameter_${parameter.name}_${parameter.in}_${index}`}
                                view={state.view} _delete={_delete}
                                param={{ ...parameter }} />);
                        })
                    }
                </div>
            </div>
        </div>
    );
}
const setParamUsage = (params, paths) => {

    let paramsInPaths = [];
    paths.forEach(path => {
        if (path.parameters && path.parameters.length > 0) {
            paramsInPaths = paramsInPaths.concat(path.parameters);
        }
    });
    for (let p of params) {
        let obj = _.find(paramsInPaths, (item) => {
            return item.keyName === p.keyName && (item.markRef === undefined || item.markRef === true)
        });
        if (obj) {
            p.used = true;
        }
        else {
            p.used = false;
        }
    }
    return params;
}