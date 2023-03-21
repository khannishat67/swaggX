import { List, Map, fromJS } from 'immutable';

export const addSubCategories = (categories, parentId, parentCategory, children) => {
    let categoriesList = fromJS(categories);
    for (let sub of children.subCategories) {
        sub.category = parentCategory;
    }
    let keyPath = findKeyPathOf(categoriesList, 'children', node => node.get('id') === parentId);
    let newCategoriesList = categoriesList.updateIn(keyPath, node => node.set('children', children.subCategories));
    return newCategoriesList.toJS();
}
export const searchResponse = (categories, data) => {
    let newCategories = List([]);
    if (data && data.subCategories) {
        for (let category of categories) {
            let newCategory = Map(category);
            let children = List([]);
            for (let result of data.subCategories) {
                if (result.parent_ids.includes(category.id) || result.category === category.id) {
                    children = children.push(Map(result));
                }
            }
            newCategory = newCategory.set('children', children);
            newCategories = newCategories.push(newCategory);
        }
    }
    return newCategories.toJS();
}
const findKeyPathOf = (tree, childrenKey, predicate) => {
    let path;
    if (List.isList(tree)) {
        tree.some((child, i) => {
            path = findKeyPathOf(child, childrenKey, predicate);
            if (path)
                return path.unshift(i);
            return path;
        });
        return path;
    }
    if (predicate(tree)) return [];
    if (tree && tree.has(childrenKey)) {
        path = findKeyPathOf(tree.get(childrenKey), childrenKey, predicate);
    }
    if (path) return [childrenKey].concat(path);
}