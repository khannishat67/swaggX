import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './LeftNavigation.less';
import SearchBox from '../searchbox/SearchBox';
import CategoryView from '../category-view/CategoryView';
import { fetchCategory, searchSubCategory } 
    from '../../../store/actions/DataDictionaryActions';
import { Box, Paper } from '@material-ui/core';

const LeftNavigation = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const dataDictionary = useSelector(state => state.dataDictionary);
    useEffect(() => {
        if (dataDictionary.categories && dataDictionary.categories.length === 0) {
            dispatch(fetchCategory());
        }
        //eslint-disable-next-line
    }, []);
    const searchSubListCategory = (text) => {
        dispatch(searchSubCategory(text));
    }
    const onSearch = (e) => {
        let text = e.target.value;
        setSearchText(text);
        searchSubListCategory(text);
    }

    return (
        <Paper className="leftnav" >
            <SearchBox onSearch={onSearch} searchText={searchText} />
            <CategoryView
                searchText={searchText}
                searchResult={dataDictionary.searchResult} />
        </Paper>
    );
}
export default LeftNavigation;