import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useAuthContext } from "./../../Context";
import { db } from "../../../firebase-config";
import { setDoc, doc } from "firebase/firestore";
import MovieCard from "./MovieCard";
import PageComponent from "../../Pagination/Pagination";

export default function Movies() {

  const { currentUser } = useAuthContext();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState()
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState();
  const key = process.env.REACT_APP_API_KEY;

  //this populates the screen on load with recent popular movies
  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await fetch(
        // `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
      );
      const json = await movieData.json();
      setMovies(json.results);
    };
    fetchMovie();
  }, [page]);

  //this makes api call to get return user's search results
  const getSearchResults = async (searchInput) => {
    console.log(searchInput);
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchInput}&page=1&include_adult=false`
    );
    const json = await data.json();
    setSearchResults(json.results);
  };

  // console.log("currentuserfrommovies:", currentUser);
  return (
    <div className="movie-page">
      <h1>Browse trending movies</h1>

      <div className="search-bar">
        <MdSearch className="search-icon" size="1.3em" />
        <input
          className="search-input"
          type="text"
          onChange={handleSearchInput}
          placeholder="search movies"
        ></input>
      </div>

      <div className="movie-container">
        {searchResults
          ? renderMovieCard(searchResults)
          : renderMovieCard(movies)}
      </div >
      <div className="pagination">
        <PageComponent setPage={setPage} numOfPages={numOfPages}/>
      </div>
    </div>
  );

  function renderMovieCard(arr) {
    return arr.map((movie) => (
      <MovieCard movie={movie} handleClick={handleMovieClick} />
    ));
  }
  
  //get user text input and set it to state
  function handleSearchInput(e) {
    setSearchInput(e.target.value);
    getSearchResults(searchInput);
  }

  function handleMovieClick(id, title, image) {
    const clickedMovie = {
      id: id,
      title: title,
      img: image,
    };
    console.log("clickedmovie:", clickedMovie, "currentuser:", currentUser);
    //get reference to collection of movies belonging to currentUser doc:
    // const watchlist = collection(db, `users/${currentUser.uid}/watchlist`)
    // console.log('watchlist:', watchlist)
    addMovieToWatchlist(clickedMovie)
  }

  //put this function inside handleMovieClick or inside a useEffect with clickedMovie as dependency?
  //will need to check if it exists first
  async function addMovieToWatchlist(clickedMovie){
    const movieRef = doc(db, `users/${currentUser.uid}/watchlist`, `${clickedMovie.id}`)
    await setDoc(movieRef, {
        id: clickedMovie.id,
        title: clickedMovie.title,
        poster_path: clickedMovie.img
    })
    .then(data=>console.log('resp',data))
    .catch(error=>console.log('error:', error))
    
  }
  //to add data using setDoc with custom id:
  //first arg of setDoc is doc method which takes 3 args: firestore instance, collection name, custom doc id
  //second arg of setdoc is the data payload, third arg is options
}
