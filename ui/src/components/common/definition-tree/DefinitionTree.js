import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuidv4';
import _ from 'lodash';
import 'rc-tree/assets/index.css';
import './DefinitionTree.less';
import Tree, { TreeNode } from 'rc-tree';
import WFDropZone from '../controls/WFDropZone';
import { propsToTreeNode } from './DefinitionTreeUtil';
import DefinitionTreeNodeItem from './DefinitionTreeNodeItem';
import {
    saveDefinitionProperty, addDefinitionHierarchy,
    copyDefinitionHierarchy
}
    from '../../../store/actions/SwaggerActions';
import { fetchSubCategoryHierarchy } from '../../../store/actions/DataDictionaryActions';
import { DefintionDropTarget } from '../../../constants/ItemTypes';

export default (props) => {
    const param = useSelector(state => state.definitionTree);
    const dispatch = useDispatch();
    const treeData = propsToTreeNode(props);

    useEffect(() => {
        if (param && param.parent && param.sub_categories && param.definitionId
            && param.definitionId === props.definition.id
            && param.dropTarget === DefintionDropTarget.TREE) {
            let existsParent = _.find(props.definition.properties, { label: param.parent.name, parentid: param.newParentId });
            if (!existsParent) {
                dispatch(addDefinitionHierarchy(props.definition.id, param.newParentId,
                    param.parent, param.sub_categories));
            }
        }
        //eslint-disable-next-line
    }, [param]);

    const _onDrop = (dropItem) => {
        if (dropItem.property && dropItem.property.name && props.editable === 'true') {
            if (dropItem.property.type === 'object') {
                if (dropItem.property.definitionId && dropItem.property.definitionId !== props.definitionId) {
                    dispatch(copyDefinitionHierarchy(dropItem.property.definitionId, dropItem.property.id, props.definition.id));
                }
                else {
                    dispatch(fetchSubCategoryHierarchy(dropItem.property, null, props.definition.id, DefintionDropTarget.TREE));
                }
            }
            else {
                let newProperty = { ...dropItem.property, id: uuid(), parentid: null };
                dispatch(saveDefinitionProperty(props.definition.id, newProperty));
            }
        }
    }

    const _onSelect = (key) => {
        let newkeys = key && key.length > 0 ? [key[key.length - 1]] : [];
        props.setSelectedProperty((newkeys.length > 0) ? newkeys[0] : null);
    }

    return (
        <WFDropZone className="dropzone-container" bgColor="#ffcb8e" overColor="#e97171" onDrop={_onDrop}>
            {
                treeData && treeData.length > 0 ?

                    <Tree
                        className="tree-container"
                        onSelect={_onSelect}
                        selectedKeys={[props.selectedProperty]}
                    >
                        {loopChildren(treeData, props.definition.id, props.editable)}
                    </Tree> :
                    <div className="dragdrop-placeholder flex-grow">
                        add or drag and drop elements here
                    </div>
            }
        </WFDropZone>
    );
}


const loopChildren = (data, definitionId, editable) => {
    return data.map((item) => {
        if (item.treeData && item.treeData.length) {
            return (<TreeNode key={item.key} icon={< DefinitionTreeNodeItem id={item.id}
                definitionId={definitionId} type={item.props.type}
                name={item.props.label || item.props.name}
                required={item.props.required}
                editable={editable}
            />} title={NO_TITLE}>
                {loopChildren(item.treeData, definitionId, editable)}
            </TreeNode >);
        }
        return (<TreeNode className="node-item"
            key={item.key}
            icon={<DefinitionTreeNodeItem id={item.id}
                definitionId={definitionId} type={item.props.type}
                name={item.props.label || item.props.name} required={item.props.required}
                editable={editable}
            />} title={NO_TITLE} />);
    });
};

const NO_TITLE = "";
