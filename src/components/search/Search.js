import React from "react";

function Search(props) {

    return (
        <div>
            <input type="text" className="searchbar" value={props.subreddit} onChange={props.onChange}></input>
        </div>
    )
}

export default Search;