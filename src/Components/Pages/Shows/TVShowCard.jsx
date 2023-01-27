import React from "react";
import { AiOutlineStar } from 'react-icons/ai'

export default function TVShowCard({ shows, handleClick }) {
  return (
    <div className="card showCard" key={shows.id}>
      
      {shows.poster_path ? (
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w300/${shows.poster_path}`}
          alt={`${shows.name} poster`}
        />
      ) : (
        <div className="filler-poster"></div>
      )}
    <h3>{shows.name}</h3>
      <p>First aired: {shows.first_air_date}</p>
      {/* <p>{show.overview}</p> */}
      <p>Add to watchlist <AiOutlineStar className='star-icon' onClick={()=>handleClick(shows.id, shows.name, shows.poster_path)}/></p>
    </div>
  );
}
