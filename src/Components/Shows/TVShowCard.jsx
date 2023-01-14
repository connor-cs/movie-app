import React from 'react'
import MovieCard from '../Movies/MovieCard'

export default function TVShowCard({ show }) {
    return (
        <div className='card showCard' key={show.id}>
            <h3>{show.name}</h3>
            <p>First aired: {show.first_air_date}</p>
            {show.poster_path ?
                <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={`${show.name} poster`} /> :
                <div className='filler-poster'></div>}

            {/* <p>{show.overview}</p> */}
            <p>Add to watchlist</p>
        </div>
    )
}
