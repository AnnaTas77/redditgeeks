import React, { useState } from 'react'
import './addsub.css'
import Search from '../search/Search';
import swal from 'sweetalert';


const Addsub = (props) => {

    const [newSubreddit, setNewSubreddit] = useState(""); //STATE

    const subsHandler = (e) => {
        const userInput = e.currentTarget.value;
        userInput.toLowerCase();

        if (userInput.length <= 20) {
            setNewSubreddit(userInput.trim());
        } else {
            swal("Please provide up to 20 characters.");
            setNewSubreddit("");
        }
    };

    const addNewSub = () => {
        const addSubreddit = props.addSubreddit;

        if (newSubreddit !== "") {
            addSubreddit(newSubreddit);
            setNewSubreddit("");
        } else {
            swal("Please enter a subreddit title.");
        }
    }

    const onEnterPress = (e) => {
        //triggered by pressing the 'Enter' key    
        if (e.code === 'Enter') {
            addNewSub();
        }
    };


    return (
        <div className='addsub-wrapper'>

            <div className="searchbar-container">
                <Search subreddit={newSubreddit} onChange={subsHandler} onKeyDown={onEnterPress} />
            </div>

            <div className="button-wrapper">
                <button className="button-plus" onClick={addNewSub}>+</button>
            </div>

        </div>
    )
}

export default Addsub;