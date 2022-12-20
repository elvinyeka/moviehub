import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CustomPagination from "../components/CustomPagination";
import SingleContent from "../components/SingleContent";
const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}`;

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [error, setError] = useState({ show: false, msg: "" });
  const fetchTrending = async () => {
    try {
      const { data } = await axios(`${url}&page=${page}`);
      setContent(data.results);
    } catch (error) {
      console.log(error);
      setError({ show: true, msg: error.message });
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
      </div>
    );
  }

  return (
    <section>
      <h2 className="page__title">Trending</h2>
      <div className="movies">
        {content &&
          content.map((movie) => {
            return (
              <SingleContent
                key={movie.id}
                {...movie}
                specType={movie.media_type}
              />
            );
          })}
      </div>
      <CustomPagination setPage={setPage} />
    </section>
  );
};

export default Trending;
