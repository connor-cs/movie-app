
import React from 'react'

export default function WatchlistCard({ item, handleRemoveClick}) {
  
  return (
    <div className='card' key={item.id}>
      <h3>{item.title}</h3>
      {item.poster_path ?
        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={`${item.title} poster`} /> :
        <div className='filler-poster'></div>}
      <button onClick={()=>handleRemoveClick(item.id)}>Remove from list</button>
    </div>
  )

}
