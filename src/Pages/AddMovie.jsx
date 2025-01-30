import React, { useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../component/baseurl';
import {useNavigate } from 'react-router-dom';
const initData = {
    title:"",
    poster:"",
    releaseDate:"",
    genre:"",
    description:"",
}

const AddMovie = () => {
   const [formData, setFormData] = useState(initData)
   const [loading, setLoading] = useState(true)
   const navigate = useNavigate()
   const handleChange=(e)=>{
const {name, value} = e.target;
setFormData({...formData, [name]:value})
   }
   const handleAddMovie = async(e)=>{
    e.preventDefault();
    console.log(formData);
    try {
        await axios.post(`${baseUrl}/movies`,formData)
        navigate("/movies")
    } catch (error) {
        alert("failed toadd movie")
        console.log(error)
    }

   }
  return (
    <div>
     <h1>Add Movie</h1>
     <form onSubmit={handleAddMovie} >
        <input type="text" placeholder='Enetr Title' name='title' value={formData.title} onChange={handleChange}/>
        <input type="text" placeholder='Enetr Poster url' name="poster" value={formData.poster} onChange={handleChange}/>
        <input type="date" placeholder='Enetr Realse Date' value={formData.releaseDate} name='releaseDate' onChange={handleChange}/>
        <input type="text" placeholder='Enetr grnre' value={formData.genre} name='genre' onChange={handleChange}/>
        <textarea type="text" placeholder='Enetr Descri[tion' value={formData.description} name='description' onChange={handleChange}/>
        <input type="submit" value="Add movie" />
     </form>
    </div>
  )
}

export default AddMovie
