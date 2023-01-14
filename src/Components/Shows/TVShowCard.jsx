import React from 'react'

export default function TVShowCard({shows}) {
  return (
    <div className='card showCard' key={shows.id}>
        <h3>{shows.name}</h3>
        <p>First aired: {shows.first_air_date}</p>
        <img src={`https://image.tmdb.org/t/p/w500/${shows.poster_path}`}/>
        {/* <p>{shows.overview}</p> */}
    </div>
  )
}
