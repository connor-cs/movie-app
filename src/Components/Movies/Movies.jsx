import React from 'react'
import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { MdSearch } from "react-icons/md";


export default function Movies() {

    const [movies, setMovies] = useState([])
    const [searchInput, setSearchInput] = useState("")
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
    const getSearchResults = async (searchInput) => {
        console.log(searchInput)
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchInput}&page=1&include_adult=false`)
        const json = await data.json()
        setSearchResults(json.results)
    }

    //get user text input and set it to state
    function handleSearchInput(e) {
        setSearchInput(e.target.value)
        getSearchResults(searchInput)
    }

    function renderMovieCard(arr) {
        return arr.map(movie => <MovieCard movie={movie} />)
    }

    return (

        <div className='movie-page'>

            <h1>Movies</h1>

            <div className='search-bar'>
                <MdSearch className='search-icon' size="1.3em" />

                <input
                    className='search-input'
                    type="text"
                    onChange={handleSearchInput}
                    placeholder="search movies">
                </input>
            </div>

            <div className='movie-container'>
                {searchResults ? renderMovieCard(searchResults) : renderMovieCard(movies)}
            </div>
        </div>
    )
}
