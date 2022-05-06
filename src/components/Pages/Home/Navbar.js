import React from 'react'
import Logo from './4.png'
import { NavLink } from "react-router-dom"
import './Nav.css'



function Navbar() {
    return (
        <>
            <div className='navbar'>
                <div className='logo'>
                    <img id="logoimg" src={Logo} alt="image could not found" />
                </div>
                <div className='Navoptions' >
                    <NavLink className="navfont" to="/">Home</NavLink>
                </div>
                <div className='Navoptions'>
                    <NavLink className="navfont" to="/about">About us</NavLink>
                </div>
                <div className='Navoptions' >
                    <NavLink className="navfont" to="/contact">Contact us</NavLink>
                </div>
                <div className='Navoptions' id='last'>
                    <NavLink className="navfont" to="/login">Login</NavLink>
                </div>
            </div>


        </>
    )
}

export default Navbar