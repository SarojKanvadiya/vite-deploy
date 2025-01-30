import React, { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
    //lazy loading
    const [isAuthenticated, setAuthenticated] = useState(()=>{
        return localStorage.getItem("token")?true:false
    })
    const [token, setToken] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        console.log(token)
    }, [token])
    const login = (authToken) => {
        // set the authentication true
        setAuthenticated(true)
        // set the token
        setToken(authToken)
        localStorage.setItem("token",authToken)
        // navigate me to home
        navigate(location.state.from||"/")
    }
    const logout = () => {
        // set authentication false
        setAuthenticated(false)

        // set the token to null
        setToken(null)
        localStorage.removeItem("token")
        // navigate the user to login
        navigate('/login')
    }
    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider

//logged in user as admin
// logged in=>user=>admin
// user=>view=>rate
// admin=>edit=>create=>delete
