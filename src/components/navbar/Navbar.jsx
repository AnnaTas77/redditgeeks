import React from 'react';
import './navbar.css';
import Logo from '../../assets/redditgeeks-icon-viewbox.svg'


const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='nav-logo'>
                <img src={Logo} alt='logo' />
            </div>
            <div className='website-name'>
                Reddit Geeks
            </div>
        </div>
    )
}

export default Navbar;