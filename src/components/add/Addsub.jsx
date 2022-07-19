import React from 'react'
import './addsub.css'

const Addsub = (props) => {


    return (
        <div className='addsub-wrapper'>
            <button className="button-plus" onClick={props.addSubbreddit}>+</button>
        </div>
    )
}

export default Addsub