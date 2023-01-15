import React, { useState, createContext } from "react";

export const LoggedInContext = createContext()

export const ContextProvider = (props) => {
    const [loggedInState, setLoggedInState] = useState(false)
    const [user, setUser] = useState({
        userName: '',
        userId: ''
    })
    return (
        <LoggedInContext.Provider value={{ loggedInState, setLoggedInState, user, setUser }}>
            {props.children}
        </LoggedInContext.Provider>
    )
}
