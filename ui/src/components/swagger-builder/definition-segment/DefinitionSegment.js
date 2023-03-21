import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import uuid from 'uuidv4';
import './DefinitionSegment.less';
import ApiSectionHeader from '../../common/api-section-header/ApiSectionHeader';
import DefinitionBody from '../../common/definition/DefinitionBody';
import WFDropZone from '../../common/controls/WFDropZone';
import { setDefinition, 
    deleteDefinition, dropDefinitionResource,
    addResourceDefinitionProperties } from '../../../store/actions/SwaggerActions';
import { fetchSubCategoryHierarchy } from '../../../store/actions/DataDictionaryActions';
import { DefintionDropTarget } from '../../../constants/ItemTypes';

export default () => {
    const dispatch = useDispatch();

    const param = useSelector(state => state.definitionTree);
    const definitions = useSelector(state => state.swagger.definitions.toJS());

    useEffect(() => {
        if (param && param.definitionId 
            && param.dropTarget === DefintionDropTarget.BASE) {
            dispatch(addResourceDefinitionProperties(param.definitionId, param.sub_categories));
        }
        //eslint-disable-next-line
    }, [param]);

    const [state, setState] = useState({
        view: "thumbnail"
    });

    const _onAddClick = () => {
        dispatch(setDefinition(null, {}));
    }

    const _onToggle = (viewType) => {
        setState((prevState) => ({
            ...prevState,
            view: viewType
        }));
    }

    const _onDrop = (dropItem) => {
        if (dropItem && dropItem.property 
            && dropItem.property.type === 'object') {
            const newDefinition = {
                id: uuid(),
                key: dropItem.property.name,
                description: dropItem.property.description,
                type: "object"
            };
            batch(() => {
                dispatch(dropDefinitionResource(newDefinition));
                dispatch(fetchSubCategoryHierarchy(dropItem.property, null, 
                    newDefinition.id, DefintionDropTarget.BASE));
            });
        }
    }

    const deleteDef = (id) => {
        dispatch(deleteDefinition(id));
    }

    return (
        <div className="flex-column w-100" >
            <ApiSectionHeader
                _onToggle={_onToggle} 
                _onAddClick={_onAddClick} 
            />
            <WFDropZone onDrop={_onDrop} className="definition-segment w-100" bgColor="#fff" overColor="#f5efef">
                {
                    definitions.map((definition, index) => {
                        return (
                            <DefinitionBody
                                key={`key_definition_${definition.id}`}
                                view={state.view}
                                editable={'true'}
                                source="definition"
                                definition={definition}
                                deleteDefinition={deleteDef}
                            />
                        );
                    })
                }
            </WFDropZone>
        </div>
    );
}