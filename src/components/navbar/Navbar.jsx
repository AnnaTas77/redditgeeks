import React from 'react';
import './navbar.css';
import logo from '../../assets/logo.png'


const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='nav-logo'>
                <img src={logo} alt='logo' />
            </div>
            <div className='website-name'>
                Reddit Geeks
            </div>
        </div>
    )
}

export default Navbar;