import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <div className='Nav'>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/'><h1>Home</h1></NavLink>
            <NavLink to='/movies'>Movies</NavLink>
            <NavLink to='/shows'>Shows</NavLink>
        </div>
    )
}
