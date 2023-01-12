import React from 'react'
import { useState } from 'react'
import NavBar from './NavBar'

export default function TVShows() {

  const [shows, setShows] = useState([])
  const {tvSearch, setTvSearch} = useState()
  
  return (
    <div>
        <form>
          <input type="text" value={tvSearch}></input>
          <button type="submit">search</button>
        </form>
        <div className='show-container'>

        </div>
    </div>
  )
}
