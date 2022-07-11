import React from "react";
import './search.css';


function Search(props) {

    return (
        <div className="searchbar-container">
            <input type="text" className="searchbar" value={props.subreddit} onChange={props.onChange}></input>
        </div>
    )
}

export default Search;