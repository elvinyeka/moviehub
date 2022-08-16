import React from "react";
import movieIcon from "../assets/images/movie.png";

const Header = () => {
  return (
    <header className="header" onClick={() => window.scroll(0, 0)}>
      <img className="header__img" src={movieIcon} alt="" />
      MoviHub
    </header>
  );
};

export default Header;
