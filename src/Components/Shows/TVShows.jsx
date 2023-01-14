import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import TVShowCard from './TVShowCard'
import { MdSearch } from "react-icons/md";

export default function TVShows() {

  const [shows, setShows] = useState([])
  const [searchResults, setSearchResults] = useState()
  const [searchInput, setSearchInput] = useState('')
  const key = process.env.REACT_APP_API_KEY

  //populate page with popular tv shows when first loaded
  useEffect(() => {
    const fetchShows = async () => {
      const showData = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`)
      const json = await showData.json()
      setShows(json.results)
    }
    fetchShows()
  }, [])

  //get user search results
  const getSearchResults = async (searchInput) => {
    console.log(searchInput)
    const data = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&page=1&query=${searchInput}&include_adult=false`)
    const json = await data.json()
    setSearchResults(json.results)
  }

  function handleSearchInput(e) {
    setSearchInput(e.target.value)
    getSearchResults(searchInput)
  }

  function renderShowCard(arr) {
    return arr.map(show => <TVShowCard show={show}/>)
  }

  return (
    <div className='tvshow-page'>
      <h1>Browse shows</h1>
      <div className='search-bar'>
        <MdSearch className='search-icon' size="1.3em" />
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInput}
          placeholder="search tv shows">
        </input>
      </div>
      <div className='show-container'>
        {shows.map(show => <TVShowCard shows={show} />)}
      </div>
    </div>
  )
}
