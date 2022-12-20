import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import SingleContent from "../components/SingleContent";
import CustomPagination from "../components/CustomPagination";

const SearchPage = () => {
  const [content, setContent] = useState([]);
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      if (searchText) {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${
            type ? "tv" : "movie"
          }?api_key=${
            process.env.REACT_APP_THE_MOVIE_DB_API_KEY
          }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "15px 0" }}>
          <TextField
            style={{
              flex: 1,
              backgroundColor: "rgba(167, 210, 233, 0.3)",
              backdropFilter: "blur(15px)",
            }}
            className="search__box"
            label="search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{
              marginLeft: 10,
              backgroundColor: "rgba(167, 210, 233, 0.3)",
              backdropFilter: "blur(15px)",
              color: "#fff",
            }}
            onClick={fetchSearch}
            type="submit"
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 10,
          }}
          value={type}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab
            style={{
              width: "50%",
              backgroundColor: "rgba(167, 210, 233, 0.3)",
              backdropFilter: "blur(15px)",
              marginRight: 5,
            }}
            label="Search Movies"
          />
          <Tab
            style={{
              width: "50%",
              backgroundColor: "rgba(167, 210, 233, 0.3)",
              backdropFilter: "blur(15px)",
            }}
            label="Search Tv Series"
          />
        </Tabs>
      </ThemeProvider>
      <div className="movies">
        {content &&
          content.map((movie) => {
            return (
              <SingleContent
                key={movie.id}
                {...movie}
                specType={type ? "tv" : "movie"}
              />
            );
          })}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default SearchPage;
