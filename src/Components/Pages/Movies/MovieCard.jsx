import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { unavailable } from '../../utils/config'
export default function MovieCard({ movie, handleClick, movieCardClick}) {

  return (
    <div className='card' onClick={()=>movieCardClick(movie)} key={movie.id}>
      {movie.poster_path ?
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={`${movie.title} poster`} /> :
        unavailable}
      <h3>{movie.title}</h3>
      {movie.release_date ? <p>Released: {movie.release_date}</p> : null}
      {movie.vote_average ? <p>Average score: {movie.vote_average}</p> : null}
      {/* <p>{movie.overview}</p> */}
      <p>Add to list <AiOutlineStar className='star-icon' onClick={() => handleClick(movie.id, movie.title, movie.poster_path)} /></p>
    </div>
  )
}
