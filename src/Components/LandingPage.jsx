import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <button>
        <Link to="/shows">Browse TV</Link>
      </button>
      <button>
        <Link to="/movies">Browse Movies</Link>
      </button>
    </div>
  );
}
