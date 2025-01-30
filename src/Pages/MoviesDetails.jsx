import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../component/baseurl'
import axios from 'axios'
const MoviesDetails = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)
    const[loading, setLoading] = useState(true)
    const [ error, setError] = useState(null)
    useEffect(()=>{
        const fetchMovie = async()=>{
            try {
                const response = await axios.get(`${baseUrl}/movies/${id}`)
                console.log(response)
                setMovie(response.data)
                setLoading(false);
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }
        fetchMovie()
    },[id])
    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>
  return (
    <div className='movie-details-container'>
      <div className='movies-card'>
      <h1>{movie.title}</h1>
        <img src={movie.poster} alt={movie.titke} />
      <h3>{movie.description}</h3>
      <p>{movie.releaseDate}</p>
      <h3>{movie.genre}</h3>
      </div>

    </div>
  )
}

export default MoviesDetails
