import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Router from 'next/router';
//RFH import 
import { useForm } from 'react-hook-form';
import useStyles from './style';
const Search = () => {
    const classes = useStyles();

    //RFH hook
    const { handleSubmit, register } = useForm();

    const handleSearch = (data) => {
        document.getElementById("searchForm").reset();
        console.log("searching...")
        const { search } = data
        // Redirecct to /searching
        Router.push({
            pathname: '/searching',
            query: { "q": search.trim() }
        })
    }
    return (
        <form id="searchForm" className={classes.search} onSubmit={handleSubmit(handleSearch)}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                name="search"

                autoComplete="off"
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                inputRef={register({
                    required: true,
                    validate: value => value.trim() !== ""
                })}
            />
        </form>
    );
}

export default Search;
