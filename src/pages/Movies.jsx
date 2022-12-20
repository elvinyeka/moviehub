import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../components/CustomPagination";
import Genres from "../components/Genres";
import SingleContent from "../components/SingleContent";
import useGenres from "../hooks/useGenre";

const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`;

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovies = async () => {
    try {
      const { data } = await axios(
        `${url}&page=${page}&with_genres=${genreforURL}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
      setError({ show: true, msg: error.message });
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, genreforURL]);

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page__title">Movies</h2>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movies">
        {content &&
          content.map((movie) => {
            return <SingleContent key={movie.id} {...movie} specType={'movie'} />;
          })}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
