import React, {useState, createContext} from "react";

export const LoggedInContext = createContext()

export const ContextProvider = (props) => {
    const [loggedInState, setLoggedInState] = useState(false)
    const [user, setUser] = useState({
        userName: ''
    })
    return (
        <ContextProvider value={{loggedInState, setLoggedInState, user, setUser}}>
            {props.children}
        </ContextProvider>
    )
}
