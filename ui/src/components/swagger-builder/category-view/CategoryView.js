import React, { useState, useEffect, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import WFDraggableListItem from '../../common/controls/WFDraggableListItem';
import CategoryLoader from './CategoryLoader';
import './CategoryView.less';

import { fetchSubCategory, resetSearch } from '../../../store/actions/DataDictionaryActions';
import { makeStyles, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(1),
    }
}));
export default (props) => {
    const dispatch = useDispatch();
    const dataDictionary = useSelector(state => state.dataDictionary);
    const [selectedNav, setSelectedNav] = useState([]);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState('');
    const selectionRef = useRef();
    const classes = useStyles();
    let categories = props.searchResult && props.searchResult.length > 0 ? props.searchResult : dataDictionary.categories;

    const fetchSubListCategory = (parentId, parentCategory) => {
        dispatch(fetchSubCategory(parentId, parentCategory));
    }
    const resetSearchResult = () => {
        dispatch(resetSearch());
    }
    useEffect(() => {
        setLoading(false);
    }, [dataDictionary.categories]);
    useEffect(() => {
        selectionRef.current = selectedNav;
    }, [selectedNav]);

    useEffect(() => {
        if (!props.searchText || props.searchText === null || props.searchText === '' || props.searchText.length === 0)
            // eslint-disable-next-line
            categories = dataDictionary.categories;
        setSelectedNav([]);
        resetSearchResult();

    }, [props.searchText]);

    useEffect(() => {
        if (props.searchText && props.searchText !== null && props.searchText !== '' && props.searchText.length > 0) {
            let newCategories = props.searchResult.filter(category => {
                if (category.children && category.children.length > 0) {
                    return true;
                }
                return false;
            }).map(item => item.id);

            setSelectedNav([...newCategories]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.searchResult]);

    useEffect(() => {
        return () => {
            resetSearchResult();
        }
        // eslint-disable-next-line
    }, []);

    const _handleClick = (node) => {
        if (!selectedNav.includes(node.id)) {
            let newSelections = [...selectionRef.current, node.id];
            setSelectedNav(newSelections);
            if (!node.children || node.children.length === 0) {
                let category = node.category ? node.category : node.name;
                fetchSubListCategory(node.id, category);
                setCurrent(node.id);
                setLoading(true);
            }
        }
        else {
            let newSelectedNav = selectionRef.current.filter(function (item) {
                return item !== node.id
            });
            setSelectedNav([...newSelectedNav]);
            setCurrent('');
        }
    };

    const _expandIcon = (node) => {
        if (props.searchText && props.searchText !== null && props.searchText !== '' && props.searchText.length > 0) {
            return null;
        }
        else {
            if (node.children_ids && node.children_ids.length > 0) {
                return (selectedNav.includes(node.id)) ?
                    <ExpandCollapsedButton
                        expand={true}
                        node={node}
                        _handleClick={_handleClick}
                    /> :
                    <ExpandCollapsedButton
                        expand={false}
                        node={node}
                        _handleClick={_handleClick}
                    />
            }
        }
        return null;
    }

    const ExpandCollapsedButton = memo((props) => {
        const _handleClick = () => {
            props._handleClick(props.node);
        }
        if (props.expand) {
            return (<ExpandLess onClick={_handleClick} />);
        }
        else {
            return (
                <ExpandMore onClick={_handleClick} />
            )
        }

    }, (prev, next) => prev.expand === next.expand);

    const mapStructure = (nodes, id) => {
        if (nodes && nodes.length > 0) {
            return (
                <Collapse in={(selectedNav.includes(id))} timeout={100} unmountOnExit={true} key={id}>
                    <List component="div" className={classes.nested}>
                        {
                            nodes.map( (node) => (
                                node ? (node.type !== 'group') ? (<>
                                    <WFDraggableListItem
                                        className="nav-sub-list"
                                        name={node.id}
                                        selected={selectedNav.includes(node.id)}
                                        property={node}
                                        key={node.id}
                                    >
                                        <ListItemText disableTypography={true} primary={<Typography variant="body2">{node.name}</Typography>} />
                                        {_expandIcon(node)}
                                    </WFDraggableListItem>
                                    {mapStructure(node.children, node.id)}
                                </>) :
                                    (
                                        <>
                                            <ListItem name={node.id}
                                                className="nav-sub-list" key={node.id}>
                                                <ListItemText disableTypography={true} primary={<Typography variant="body2">{node.name}</Typography>} />
                                                {_expandIcon(node)}
                                            </ListItem>
                                            {mapStructure(node.children, node.id)}
                                        </ >
                                    ) : null
                            ))
                        }
                    </List >
                </Collapse >
            )
        }
    }

    return (
        <div className="category-view-container">
            {categories
                && categories.length > 0 ?
                <List component="div" aria-label="main mailbox folders" >
                    {
                        categories.map((item, index) => {
                            return (
                                <>
                                    <ListItem key={item.id} name={item.id} button>
                                        <ListItemText disableTypography={true} primary={<Typography variant="subtitle1">{item.name}</Typography>} />
                                        {_expandIcon(item)}
                                    </ListItem>
                                    {(loading && current === item.id) ? (<CategoryLoader />) : mapStructure(item.children, item.id)}
                                </>
                            );
                        })

                    }
                </List> : (<div></div>)
            }
        </div >
    );
}
