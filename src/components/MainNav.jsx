import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import TvIcon from "@material-ui/icons/Tv";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "rgba(167, 210, 233, 0.3)",
    backdropFilter: "blur(15px)",
    zIndex: "2",
    color: "#fff",
  },
});

export default function MainNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        className="nav-btn"
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        className="nav-btn"
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        className="nav-btn"
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        className="nav-btn"
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
