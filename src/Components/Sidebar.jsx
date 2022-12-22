import React from 'react'
import '../sidebar.css'
import { FaBars, FaHome, FaInfo, FaUserAlt } from 'react-icons/fa'
import { TbMovie, TbDeviceTv } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(true)
    const toggle = () => setIsOpen(!isOpen)

    const menuItem = [
        {
            path: "/",
            name: "Landing Page",
            icon: <FaHome />
        },
        {
            path: "/movies",
            name: "Movies",
            icon: <TbMovie />
        },
        {
            path: "/shows",
            name: "Shows",
            icon: <TbDeviceTv />
        },
        {
            path: "/user",
            name: "My Account",
            icon: <FaUserAlt />
        },
        {
            path: "/about",
            name: "About",
            icon: <FaInfo />
        },
    ]
    return (
        <div className='side-bar-container'>
            <div style={{display: isOpen ? "block" : "none"}} className='sidebar'>
                <div className="top-section">
                    <h1 className='top'>Top</h1>
                    <div className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                <div className='side-bar-body'>
                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className='link'>
                                <div className='icon'>{item.icon}</div>
                                <div className='link-text'>{item.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
