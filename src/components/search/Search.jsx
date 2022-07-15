import React from "react";
import './search.css';


function Search(props) {

    return (
        <div className="searchbar-background">
            <div className="searchbar-container">
                <input type="text" className="searchbar" value={props.subreddit} onChange={props.onChange}></input>
            </div>
        </div>

    )
}

export default Search;