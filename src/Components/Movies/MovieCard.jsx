import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'

export default function MovieCard({ movie }) {

  const handleLikeClick = (e) => {
    console.log()
  }
  return (
    <div className='card' key={movie.id}>
      <h3>{movie.title}</h3>
      <p>Released: {movie.release_date}</p>
      {movie.poster_path ?
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={`${movie.title} poster`} /> :
        <div className='filler-poster'></div>}

      <p>Average score: {movie.vote_average}</p>
      <p>Add to list <AiOutlineStar className='star-icon' onClick={handleLikeClick} /></p>
    </div>
  )
}
