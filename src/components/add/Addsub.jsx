import React, { useState } from 'react'
import './addsub.css'
import Search from '../search/Search';


const Addsub = (props) => {

    return (
        <div className='addsub-wrapper'>

            <div className="searchbar-container">
                <Search />
            </div>

            <div className="button-wrapper">
                {/* <button className="button-plus" onClick={onClick}> + </button> */}
            </div>

        </div>
    )
}

export default Addsub