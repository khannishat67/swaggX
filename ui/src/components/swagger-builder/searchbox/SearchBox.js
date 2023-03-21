import { FormControl, Input, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';
import './SearchBox.less';

export default (props) => {
    return (
        <div className="search-box-container">
            <FormControl className="w-100" variant="outlined">
                <Input
                    startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    }
                    onChange={props.onSearch}
                    placeholder='search'
                />
            </FormControl>
        </div>
    );
}