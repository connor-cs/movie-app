import React, { useState, useEffect } from "react";


export default function About() {
  
  return (
   <div className="about-container">
    <div>
      <h3>React app using Firebase Auth and Firestore</h3>
      <ul>
        <li>Uses Firebase Auth to authenticate and manage users</li>
        <li>Allows a user to search for movies and tv shows</li>
        <li>Add shows and movies to a watchlist</li>
        <li>Uses Firestore to save user data</li>
        <li>Alllows a user to create, sign in/out, and delete their account using an email</li>
        <li>API used: themoviedb.org </li>
      </ul>
    </div>
   </div>
  );
}
