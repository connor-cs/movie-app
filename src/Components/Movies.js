import React from 'react'
import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'

export default function Movies() {

    const [movies, setMovies] = useState([])
    const [movieSearch, setMovieSearch] = useState(null)


    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=cf52cee1a7c60870abd47baad5d64923&language=en-US&page=1')
            const json = await movieData.json()
            setMovies(json.results)
            console.log('movies', movies)
        }

        fetchMovie()
        console.log(movies)
    }, [])

    function onSubmit(e) {
        e.preventDefault()
        console.log('moviesearch', movieSearch)
    }

    function onChange(e) {
        setMovieSearch(e.target.value)
    }


    return (
        <div>
            <h1>Movies</h1>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" value={movieSearch} onChange={onChange}></input>
                    <button type="submit">search</button>
                </form>
            </div>
            <div className='movie-container'>
                {movies.map(movie => {
                    return <MovieCard movie={movie} />
                })}
            </div>
        </div>
    )
}
