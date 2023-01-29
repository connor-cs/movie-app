import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { db } from "../../../firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { useAuthContext } from "../../Context";
import TVShowCard from "./TVShowCard";
import PageComponent from "../../Pagination/Pagination";
import ContentModal from "../../SingleContent/Modal";

export default function TVShows() {
  const { currentUser } = useAuthContext();
  const [displayModal, setDisplayModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [searchResults, setSearchResults] = useState();
  const [searchInput, setSearchInput] = useState("");
  const key = process.env.REACT_APP_API_KEY;

  //populate page with popular tv shows when first loaded
  useEffect(() => {
    const fetchShows = async () => {
      const showData = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
      );
      const json = await showData.json();
      setShows(json.results);
    };
    fetchShows();
  }, [page]);

  //get user search results
  const getSearchResults = async (searchInput) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&page=1&query=${searchInput}&include_adult=false`
    );
    const json = await data.json();
    setSearchResults(json.results);
  };

  //where to display modal component?
  return (
    <div className="tvshow-page">
      <h1>Browse trending shows</h1>
      <div className="search-bar">
        <MdSearch className="search-icon" size="1.3em" />
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInput}
          placeholder="search tv shows"
        ></input>
      </div>
      <div className="show-container">
        {displayModal ? (
          <ContentModal
            content={modalContent}
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
          />
        ) : null}
        {searchResults ? renderShowCard(searchResults) : renderShowCard(shows)}
      </div>
      <div className="pagination">
        <PageComponent setPage={setPage} numOfPages={numOfPages} />
      </div>
    </div>
  );

  //hande adding to watchlist
  function handleShowClick(id, name, image) {
    const clickedShow = {
      id: id,
      title: name,
      poster_path: image,
    };
    console.log("clicked show:", clickedShow);
    addShowToWatchList(clickedShow);
  }

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
    getSearchResults(searchInput);
  }

  function renderShowCard(arr) {
    return arr.map((show) => (
      <TVShowCard
        shows={show}
        handleClick={handleShowClick}
        showCardClick={showCardClick}
      />
    ));
  }

  async function addShowToWatchList(clickedShow) {
    const showRef = doc(
      db,
      `users/${currentUser.uid}/watchlist`,
      `${clickedShow.id}`
    );
    await setDoc(showRef, clickedShow)
      .then((data) => console.log("addShow response:", data))
      .catch((e) => console.log(e));
  }

  //show card that was clicked
  function showCardClick(card) {
    setModalContent(card);
    setDisplayModal(true);
    console.log(card);
  }
}
