import React, { useEffect, useState, useContext } from "react";
import { useAuthContext, UserContext } from "../Context";
import { db } from "../../firebase-config";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import WatchlistCard from "../SingleContent/WatchlistCard";

export default function User() {
  const { currentUser } = useContext(UserContext);
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
  }, [watchlist]);


  return (
    <div className='user-page'>
      <div className="user-page-header">
        <h1>Welcome user {currentUser.email}</h1>
        <button onClick={()=>navigate("/account")}>Account actions</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Your watchlist:</h2>
      <div className="watchlist-container">
        {watchlist ? watchlist.map(item => <WatchlistCard item={item} handleRemoveClick={handleRemoveClick}/>) : null}
      </div>
    </div>
  );

  async function handleRemoveClick(id){
    console.log(id)
    const docRef = doc(db, `users/${currentUser.uid}/watchlist/${id}`)
    await deleteDoc(docRef)
    setWatchlist(watchlist.filter(item=>item.id != id))
  }

  function handleLogout() {
    logout();
    navigate("/");
  }
}
