import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1 className="landing-header">Entertainment Hub</h1>
      <div className="button-div">
        <button className="landing-page-button">
          <Link to="/shows">Browse TV</Link>
        </button>
        <button className="landing-page-button">
          <Link to="/movies">Browse Movies</Link>
        </button>
      </div>
    </div>
  );
}
