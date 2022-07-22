import React, { useState } from 'react'
import './addsub.css'
import Search from '../search/Search';


const Addsub = (props) => {

    const [newSubreddit, setNewSubreddit] = useState("");


    const subsHandler = (e) => {
        setNewSubreddit(e.currentTarget.value);
    };

    const addNewSub = () => {
        const addSubreddit = props.addSubreddit;
        if (newSubreddit !== "") {
            addSubreddit(newSubreddit)
            setNewSubreddit("");
        } else {
            alert("Please enter a subreddit title.")
        }
    }

    return (
        <div className='addsub-wrapper'>

            <div className="searchbar-container">
                <Search subreddit={newSubreddit} onChange={subsHandler} />
            </div>

            <div className="button-wrapper">
                <button className="button-plus" onClick={addNewSub} >+</button>
            </div>

        </div>
    )
}

export default Addsub