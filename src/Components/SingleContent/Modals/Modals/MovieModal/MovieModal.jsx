import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { BsYoutube} from 'react-icons/bs'
import Box from "@mui/material/Box";
import "./movieModalStyles.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function MovieModal({ id, displayModal, setDisplayModal }) {
  const key = process.env.REACT_APP_API_KEY;
  const [movieDetails, setMovieDetails] = useState();
  const [video, setVideo] = useState();

  const getData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
    );
    const json = await data.json();
    setMovieDetails(json);
  };

  const getVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`
    );
    const res = await data.json();
    console.log(res);
    setVideo(res.results[0]?.key);
  };

  useEffect(() => {
    getData();
    getVideo();
  }, []);

  console.log("video:", video);

  return (
    <div className="movie-modal">
      <Modal open={displayModal} onClose={() => setDisplayModal(false)}>
        <Box className="box">
          <div className="content">
            <h3 className="title">{movieDetails?.title}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w300${movieDetails?.poster_path}`}
              alt="movie poster"
            />
            <p className="tagline">{movieDetails?.tagline}</p>
            <div className="overview">
              <p>
                {movieDetails?.overview
                  ? movieDetails?.overview
                  : "No description available"}
              </p>
            </div>
            <button
              className="video-button"
              onClick={() =>
                window.open(`https://www.youtube.com/watch?v=${video}`)
              }
            >
              <BsYoutube /> Watch trailer
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
