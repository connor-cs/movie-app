import React, { useEffect, useState, useContext } from "react";
import { useAuthContext, UserContext } from "./Context";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import MovieCard from './Movies/MovieCard'

export default function User() {
  const { loggedInState, currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [active, setActive] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const watchlistRef = collection(db, `users/${currentUser.uid}/watchlist`);
    const getWatchlist = async () => {
      const data = await getDocs(watchlistRef);
      setWatchlist(data.docs.map(doc=>doc.data()));
    };
    getWatchlist();
  }, []);

  console.log('watchlist:', watchlist)
  return (
    <>
      <div className="user-page-header">
        <h1>Welcome user {currentUser.email}</h1>
        <button>Account actions</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="saved-movies-container">
        {watchlist ? watchlist.map(item => <MovieCard movie={item}/>) : null}
      </div>
    </>
  );

  function handleLogout() {
    logout();
    navigate("/");
  }
}
