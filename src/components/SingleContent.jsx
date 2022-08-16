import moment from "moment";
import React from "react";
import { img_300, unavailable } from "../config/index";
import ContentModal from "./ContentModal";

const SingleContent = ({
  id,
  media_type,
  type,
  original_language: language,
  title,
  name,
  popularity,
  overview,
  poster_path: poster,
  release_date,
  first_air_date,
  vote_average: rating,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <img
        className="movie-card__poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="movie-card__title">{title || name}</b>
      <div className="movie-card__subtitle">
        {type === "tv" ? "TV Series" : "Movie"}
        <span className="movie-card__date">
          {moment(first_air_date || release_date).format("DD MMM YYYY")}
        </span>
      </div>
      <span className={`movie-card__rate ${rating > 6 ? "" : "border-red"}`}>
        {rating.toFixed(1)}
      </span>
    </ContentModal>
  );
};

export default SingleContent;
