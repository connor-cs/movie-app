import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <div>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/'><h1>NavBar</h1></NavLink>
            <NavLink to='/movies'>Movies</NavLink>
            <NavLink to='/shows'>Shows</NavLink>
        </div>
    )
}
