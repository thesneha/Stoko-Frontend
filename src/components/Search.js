import React from 'react';
import Icon from '@material-ui/core/Icon';

import './Search.css';
import ScriptTable from '../components/ScriptTable';
import { useState } from 'react';
function Search(props) {
    const [search,setSearch]=useState('')
    const[query,setQuery]=useState('')
    const handleSearch=()=>{
        setQuery(search)
        // console.log(search)
        // console.log(query)
    }
    return (
        <>
        <div className='search'>
            <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
            <Icon className="icon" onClick={handleSearch}>search</Icon>
            
        </div>
        <ScriptTable query={query}/>
        </>
    );
}

export default Search;<input></input>