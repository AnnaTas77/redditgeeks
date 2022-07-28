import React from "react";
import './search.css';


function Search(props) {

    let deleteButton;
    let searchbarBorderClasses = "searchbar-container";
    if (props.onDelete !== undefined) {
        deleteButton = <button className="delete-button" onClick={props.onDelete}><i className="fa-solid fa-trash-can"></i></button>
        searchbarBorderClasses += " searchbar-border-with-delete"
    } else {
        searchbarBorderClasses += " searchbar-without-delete"
    }

    return (
        <div className="searchbar-background">
            <div className={searchbarBorderClasses}>
                <input type="text" className="searchbar" placeholder="Search subreddits"
                    value={props.subreddit} onChange={props.onChange} onKeyDown={props.onKeyDown}></input>
            </div>
            {deleteButton}
        </div>

    )
}

export default Search;