import React from 'react'
import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'

export default function Movies() {

    const [movies, setMovies] = useState([])


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


    return (
        <div>
            <h1>Movies</h1>
            <div className='movie-container'>
                {movies.map(movie => {
                    return <MovieCard movie={movie} />
                })}
            </div>
        </div>
    )
}
