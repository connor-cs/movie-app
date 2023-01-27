
import React from 'react'

export default function WatchlistCard({ item, handleRemoveClick}) {
  
  return (
    <div className='card watchlist-card' key={item.id}>
      
      {item.poster_path ?
        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={`${item.title} poster`} /> :
        <div className='filler-poster'></div>}
        <h3>{item.title}</h3>
      <button 
        styles={{'border-radius': "10px"}}
      onClick={()=>handleRemoveClick(item.id)}>Remove from list</button>
    </div>
  )

}
