import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { baseUrl } from '../component/baseurl'
import InfiniteScroll from 'react-infinite-scroll-component';import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MovieScroller = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [genre,setGenre] = useState("");
  const[page, setPage] =useState(1)
  const [haseMore, setHaseMore] = useState(true)
  const [limit] = useState(5);
  const navigate = useNavigate()
  useEffect(()=>{
    setLoading(true)
    const fecthMovies = async () =>{
      try {
        const response = await axios(`${baseUrl}/movies?genre=${genre}&page=${page}&limit=${limit}`)
        if(response.data.movies.length==0){
            setHaseMore(false);
        }
        else{
            setMovies([...movies,...response.data.movies])
        }
        setPage(response.data.currentPage)
        setLoading(false);
        
      } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
      }
    }
 
    fecthMovies()
  },[genre,page])
  console.log(movies)
  console.log(genre);
  //dynamic routing for each movie
  const handleViewMore=(id)=>{
      navigate(`/movies/${id}`)
  }
  // Delte
  const handleDelete =async(id)=>{
    
      try {
        const response = await axios.delete(`${baseUrl}/movies/${id}`)
        setMovies(movies.filter((movie)=>movie.id !==id))
        console.log(response)
      } catch (error) {
        alert("failed to delete Movie");
        console.log(error)
      }

  }
  //pagination control

  const handlePrev =()=>{
    if(page>1){
      setPage(prev=>prev-1)
  }
    }
  const handleNext =()=>{
    if(page<totalPages){
      setPage(prev=>prev+1)}
  }
  if(loading) return <p>Loading Movies...</p>
  if (error) {
    return <p>{error}</p>
  }
  return (
    <div className='movies-container'>
      <h1>Movie Explorer</h1>
      <button className='add-movie-btn' onClick={()=>navigate('/add-movie')}>Add Movie</button>
      <div className='filter-section'>
        <select name="genre"value={genre} onChange={(e)=>setGenre(e.target.value)}>
          <option value="">All</option>
          <option value="Action">Action</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fic">Sci-Fic</option>
        </select>
      </div>
     <InfiniteScroll dataLength={movies.length} next={()=>setPage(prev=>prev+1)} hasMore={haseMore} loader={<h1>Loading More movies...</h1>}
     endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }>
      <div className='movies-list'>
        {movies.length>0 &&
          movies.map((movie)=>{
            return (
             <div key={movie.id} className='movies-card'>
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
              <h3>Genre: {movie.genre}</h3>
              <p>Release Date : {movie.releaseDate}</p>
              <div className='movie-actions'>
                <button className='edit-btn' onClick={()=>navigate(`/edit-movie/${movie.id}`)}>Edit</button>
                <button className='delete-btn'onClick={()=>handleDelete(movie.id)}>Delete</button>
                <button className='view-more-btn'onClick={()=>handleViewMore(movie.id)}>View More</button>
              </div>
              
             </div>
            )
          })
        }
      </div>
      </InfiniteScroll>
    </div>
  )
}

export default MovieScroller
