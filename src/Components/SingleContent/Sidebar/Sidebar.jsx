import React, { useContext, useState } from "react";
import "./sidebar.css"
import { FaBars, FaHome, FaInfo, FaUserAlt } from "react-icons/fa";
import { TbMovie, TbDeviceTv } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context";

export default function Sidebar() {
  const { loggedInState } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const navbarItem1 = loggedInState ? "/user" : "/signup";
  const navbarItem2 = loggedInState ? "My Account" : "Sign in";

  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/movies",
      name: "Movies",
      icon: <TbMovie />,
    },
    {
      path: "/shows",
      name: "Shows",
      icon: <TbDeviceTv />,
    },
    {
      path: `${navbarItem1}`,
      name: `${navbarItem2}`,
      icon: <FaUserAlt />,
    },
    {
      path: "/about",
      name: "About",
      icon: <FaInfo />,
    },
  ];

  return (
    <div className="side-bar-container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top-section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="top">
            Top text
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="side-bar-body">
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div className="icon">{item.icon}</div>
              {isOpen ? <div className="link-text">{item.name}</div> : null}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
