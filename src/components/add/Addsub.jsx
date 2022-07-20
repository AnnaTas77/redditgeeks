import React from 'react'
import './addsub.css'
import Search from '../search/Search';

const Addsub = (props) => {


    return (
        <div className='addsub-wrapper'>
            <div classname="searchbar-container"><Search /></div>
            <div className="button-wrapper">
                <button className="button-plus" onClick={props.addSubbreddit}>+</button>
            </div>

        </div>
    )
}

export default Addsub