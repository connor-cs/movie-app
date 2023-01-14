import React from 'react'

export default function TVShowCard({ shows }) {
    return (
        <div className='card showCard' key={shows.id}>
            <h3>{shows.name}</h3>
            <p>First aired: {shows.first_air_date}</p>
            {shows.poster_path ?
                <img src={`https://image.tmdb.org/t/p/w300/${shows.poster_path}`} alt={`${shows.name} poster`} /> :
                <div className='filler-poster'></div>}

            {/* <p>{show.overview}</p> */}
            <p>Add to watchlist</p>
        </div>
    )
}
