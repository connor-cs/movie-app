import React from 'react'

export default function MovieCard({movie}) {
  return (
    <div className='card' key={movie.id}>
        <h3>{movie.title}</h3>
        <p>Released: {movie.release_date}</p>
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}/>
        <p>Average score: {movie.vote_average}</p>
    </div>
  )
}
