import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { baseUrl } from '../component/baseurl';
// import {useNavigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'
const initData = {
    title:"",
    poster:"",
    releaseDate:"",
    genre:"",
    description:"",
}

const EditMovie = () => {
    const [formData, setFormData] = useState(initData)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(()=>{
        const fetchMovie = async()=>{
            try {
                const response = await axios.get(`${baseUrl}/movies/${id}`)
                console.log(response)
                setFormData(response.data)
                setLoading(false);
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }
        fetchMovie()
    },[id])
    
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
           }

    const handleEditMovie =async(e)=>{
e.preventDefault();
try {
    await axios.put(`${baseUrl}/movies/${id}`,formData)
    alert("successufull edit the movie")
    navigate("/movies")
} catch (error) {
    alert("Failed to edit movie")
}
    }
  return (
    <div>
      <h1>Edit Movie</h1>
     <form onSubmit={handleEditMovie} >
        <input type="text" placeholder='Enetr Title' name='title' value={formData.title} onChange={handleChange}/>
        <input type="text" placeholder='Enetr Poster url' name="poster" value={formData.poster} onChange={handleChange}/>
        <input type="date" placeholder='Enetr Realse Date' value={formData.releaseDate} name='releaseDate' onChange={handleChange}/>
        <input type="text" placeholder='Enetr grnre' value={formData.genre} name='genre' onChange={handleChange}/>
        <textarea type="text" placeholder='Enetr Descri[tion' value={formData.description} name='description' onChange={handleChange}/>
        <input type="submit" value="Edit movie" />
     </form>
    </div>
  )
}

export default EditMovie
