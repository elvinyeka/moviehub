import { Chip } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
  type,
}) => {
  const handleAddGenre = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((item) => item.id !== genre.id));
    setPage(1);
  };
  const handleRemoveGenre = (genre) => {
    setGenres([...genres, genre]);
    setSelectedGenres(selectedGenres.filter((item) => item.id !== genre.id));
    setPage(1);
  };
  const fetchGenres = async () => {
    const { data } = await axios(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="genre">
      {selectedGenres &&
        selectedGenres.map((genre) => {
          return (
            <Chip
              key={genre.id}
              label={genre.name}
              color="primary"
              clickable
              size="small"
              style={{
                color: "white",
                borderColor: "white",
                margin: 5,
                backgroundColor: "#001a3d",
                backdropFilter: "blur(15px)",
                boxShadow: "0px 2px 5px rgba(167, 210, 233, 0.4)",
              }}
              onDelete={() => handleRemoveGenre(genre)}
            />
          );
        })}
      {genres &&
        genres.map((genre) => {
          return (
            <Chip
              key={genre.id}
              label={genre.name}
              color="primary"
              clickable
              size="small"
              style={{
                color: "white",
                borderColor: "white",
                margin: 5,
                backgroundColor: "rgba(167, 210, 233, 0.5)",
                backdropFilter: "blur(15px)",
                boxShadow: "0px 2px 5px rgba(167, 210, 233, 0.4)",
              }}
              onClick={() => handleAddGenre(genre)}
            />
          );
        })}
    </div>
  );
};

export default Genres;
