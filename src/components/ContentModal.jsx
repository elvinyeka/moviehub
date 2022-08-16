import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { unavailable, img_500, unavailableLandscape } from "../config";
import moment from "moment";
import ActorCarousel from "./ActorsCarousel";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "rgba(0, 26, 61, 0.3)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(0, 26, 61, 0.3)",
    borderRadius: 10,
    color: "#fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 2, 3),
    overflowY: "scroll",
  },
}));

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState({});
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      if (media_type) {
        const { data } = await axios(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}&language=en-US`
        );
        setContent(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideo = async () => {
    try {
      if (media_type) {
        const { data } = await axios(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_THE_MOVIE_DB_API_KEY}&language=en-US`
        );
        setVideo(data.results[0]?.key);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="movie-card" type="button" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={`${classes.paper} content-modal__box`}>
              <div className="content-modal">
                <img
                  className="content-modal__portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.title || content.name}
                />
                <img
                  className="content-modal__landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.title || content.name}
                />
                <div className="content-modal__about">
                  <h3 className="content-modal__title">
                    {content.title || content.name}(
                    {moment(
                      content.first_air_date || content.release_date
                    ).format("YYYY")}
                    )
                  </h3>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <p className="content-modal__desc">{content.overview}</p>
                  <div>
                    <ActorCarousel media_type={media_type} id={id} />
                  </div>
                </div>
              </div>
              <iframe
                className="content-modal__player"
                title={content.name || content.title}
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${video}`}
              ></iframe>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}
