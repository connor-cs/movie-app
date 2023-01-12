import React from 'react'
import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { MdSearch } from "react-icons/md";


export default function Movies() {

    const [movies, setMovies] = useState([])
    const [searchInput, setSearchInput] = useState("")
    // have seperate state var for search results, so when movie page is rendered, use ternary to either display default
    // movies or display search results, is there better way?
    const [searchResults, setSearchResults] = useState()
    const key = process.env.REACT_APP_API_KEY

    //this populates the screen on load with recent popular movies
    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`)
            const json = await movieData.json()
            setMovies(json.results)
        }
        fetchMovie()
    }, [])

    //this makes api call to get return user's search results
    //maybe try using useQuery??
    const getSearchResults = async (searchInput) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/keyword?api_key=${key}&query=${searchInput}&page=1`)
        const json = await data.json()
        //unfortunately the results only seem to be name and a movie id, so insufficient for displaying a moviecard
        console.log("search results:", json.results)
        setSearchResults(json.results)
    }

    //get user text input and set it to state
    function handleSearchInput(e) {
        setSearchInput(e.target.value)
        console.log('this is searchInput state:', searchInput)
        //clear text from search input

        getSearchResults(searchInput)
    }


    return (

        <div className='movie-page'>

            <h1>Movies</h1>

            <div className='search-bar'>
                <MdSearch className='search-icon' size="1.3em" />
                <input
                    className='search-input'
                    type="text"
                    onChange={handleSearchInput}>
                </input>
                <button type="submit">search</button>
            </div>

            <div className='movie-container'>
                {movies.map(movie => {
                    return <MovieCard movie={movie} />
                })}
            </div>
        </div>
    )
}
