import React from 'react';
import './navbar.css';
import { RiMenu3Line, RiCloseLin } from 'react-icons/ri';
import logo from '../../assets/logo.png'


const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='nav-logo'>
                <img src={logo} alt='logo' />
            </div>
            <div className='website-name'>
                Redditophilia
            </div>
        </div>
    )
}

export default Navbar