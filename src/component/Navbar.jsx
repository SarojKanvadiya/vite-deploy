import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import '../App.css'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
const Navbar = () => {
    const {isAuthenticated,logout}= useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout = () =>{
logout()
    }
    
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <NavLink to='/' className='nav-link'>Home</NavLink>
        <NavLink to='/movies' className='nav-link'>Movies</NavLink>
      </div>
      <div className='navbar-right'>
        {
            isAuthenticated ? <button onClick={handleLogout}>Logout</button>: <button onClick={()=>navigate('/login')}>Login</button>
        }
        {/* <NavLink to='/login' className='nav-link'>Login</NavLink> */}
      </div>
    </nav>
  )
}

export default Navbar
