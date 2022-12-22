import React from 'react'
import { FaBars, FaHome, FaInfo, FaUserAlt } from 'react-icons/fa'
import { TbMovie, TbDeviceTv } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(false)
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
            <div className='sidebar'>
                <div className="top-section">
                    <h1>Top</h1>
                    <FaBars />
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
