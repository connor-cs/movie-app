import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'

export default function MovieCard({ movie, handleClick, movieCardClick }) {

  return (
    <div className='card movie-card' onClick={() => movieCardClick(movie)} key={movie.id}>
      {movie.poster_path ?
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={`${movie.title} poster`} /> :
        <div className='filler-poster'></div>}
      <h3>{movie.title}</h3>
      {movie.release_date ? <p><span>Released:</span> {movie.release_date}</p> : null}
      {movie.vote_average ? <p><span>Average score:</span> {movie.vote_average}</p> : null}
      <p className='add'>Add to list <AiOutlineStar className='star-icon' onClick={(e) => {
        e.stopPropagation()
        handleClick(movie.id, movie.title, movie.poster_path)
      }
      } /></p>
    </div>
  )
}
