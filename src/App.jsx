import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import Login from './Pages/Login'
import Footer from './component/Footer'
import './App.css'
import PrivateRoute from './component/PrivateRoute'
import MoviesDetails from './Pages/MoviesDetails'
import AddMovie from './Pages/AddMovie'
import EditMovie from './Pages/EditMovie'
import MovieScroller from './Pages/MovieScroller'

const App = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar/>
      {/* all routes go inside */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* <Route path='/movies' element={<PrivateRoute>
          <MovieScroller/>
        </PrivateRoute>}/> */}
        <Route path='/movies' element={<PrivateRoute>
          <Movies/>
        </PrivateRoute>}/> 
        <Route path='/movies/:id' element={<PrivateRoute>
          <MoviesDetails/>
        </PrivateRoute>}/>    
            <Route path='/add-movie' element={<PrivateRoute>
          <AddMovie/>
        </PrivateRoute>}/>
        <Route path='/edit-movie/:id' element={<PrivateRoute>
          <EditMovie/>
        </PrivateRoute>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default App
