import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { json } from 'react-router-dom'

export default function TVShows() {

  const [shows, setShows] = useState([])
  const {tvSearch, setTvSearch} = useState()
  const key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const fetchShows = async () => {
      const showData = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`)
      const json = await showData.json()
      setShows(json.results)
    }
    fetchShows()
  }, [])
  
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
