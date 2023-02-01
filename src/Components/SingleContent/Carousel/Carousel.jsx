import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { noPicture } from "../../utils/config";

export default function Carousel({ id }) {
  const [cast, setCast] = useState([]);
  const key = process.env.REACT_APP_API_KEY;

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}&language=en-US`
    );
    const json = await data.json();
    console.log("cast data: ", json);
    setCast(json.cast);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const items = cast.map((person) => {
    console.log(person.name)
    return (
    <div className="carousel-item">
      <img
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w300/${person.profile_path}`
            : noPicture
        }
        alt={`${person.name}`}
        className="carousel-image"
      />
      <p>{person.name}</p>
    </div>);
  });



  return (
    <div>
      <AliceCarousel
        mouseTracking
        responsive={responsive}
        autoplay
        items={items}
      />
    </div>
  );
}
