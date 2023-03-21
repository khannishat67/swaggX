import _ from 'lodash';

export const propsToTreeNode = (props) => {
    let treeData = [];
    if (props && props.definition && props.definition.properties) {
        let properties = props.definition.properties;
        treeData = properties.map((property, index) => {
            return {
                key: property.id,
                title: property.name,
                id: property.id,
                parentid: property.parentid,
                props: property,
                treeData: []
            };
        });
    }
    return toTree([...treeData]);
}

const toTree = (array, parent, tree) => {
    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : { id: null };
    let children = _.filter(array, function (child) {
        if (!child.parentid) child.parentid = null;
        return child.parentid === parent.id;
    });
    if (!_.isEmpty(children)) {
        if (parent.id === null) {
            tree = children;
        } else {
            parent['treeData'] = children
        }
        _.each(children, function (child) { toTree(array, child) });
    }
    return tree;
}