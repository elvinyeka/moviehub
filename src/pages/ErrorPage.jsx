import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="error">
      <p className="error-back">
        The requested URL was not found on our server.{" "}
        <Link to="/">Go to the homepage »</Link>
      </p>
      <div className="error-box">
        <h2 className="error-code">
          404
          <span>error</span>
        </h2>
        <h2 className="error-title">There is no page</h2>
      </div>
      <div className="error-arrow"></div>
      <div className="error-info">
        Spoon Bay,{" "}
        <a href="https://www.imdb.com/title/tt0133093/?ref_=nv_sr_srsg_0">
          The Matrix(1999)
        </a>
      </div>
    </section>
  );
};

export default ErrorPage;
