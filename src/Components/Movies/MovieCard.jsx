import React from 'react'
import { useContext } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { useAuthContext, UserContext } from '../Context'


//where to handle state for movie that was clicked? this doesn't seem like the best place
export default function MovieCard({ movie, handleClick }) {
  const { loggedInState, currentUser } = useAuthContext()

  return (
    <div className='card' key={movie.id}>
      <h3>{movie.title}</h3>
      {movie.release_date ? <p>Released: {movie.release_date}</p> : null}
      {movie.poster_path ?
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={`${movie.title} poster`} /> :
        <div className='filler-poster'></div>}
      {movie.vote_average ? <p>Average score: {movie.vote_average}</p> : null}
      {/* <p>{movie.overview}</p> */}
      <p>Add to list <AiOutlineStar className='star-icon' onClick={()=>handleClick(movie.id, movie.title, movie.poster_path)} /></p>
    </div>
  )
}
