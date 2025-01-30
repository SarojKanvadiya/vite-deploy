import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useContext(AuthContext)
    const location = useLocation()
    if(!isAuthenticated){
        return <Navigate to= '/login' state={{from:location}} />
    }
  return children
}

export default PrivateRoute
