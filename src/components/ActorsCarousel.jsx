import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";

import { img_300, noPicture } from "../config";

const handleDragStart = (e) => e.preventDefault();

const ActorCarousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((credit) => (
    <div className="carousel-item">
      <img
        src={
          credit.profile_path ? `${img_300}/${credit.profile_path}` : noPicture
        }
        alt={credit?.name}
        onDragStart={handleDragStart}
        className="carousel-item__img"
      />
      <br />
      <b className="carousel-item__txt">{credit?.name}</b>
    </div>
  ));

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
  const fetchActors = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}&language=en-US`
    );

    setCredits(data.cast);
  };

  useEffect(() => {
    fetchActors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      // autoPlay
    />
  );
};

export default ActorCarousel;
