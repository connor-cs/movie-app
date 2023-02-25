import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import './modal.css'

export default function TVModal({
  content,
  displayModal,
  setDisplayModal,
}) {

  return (
    <div className="tv-modal">
      <Modal
        className="modal"
        open={displayModal}
        onClose={() => setDisplayModal(false)}
        BackDropComponent={Backdrop}
      >
        <Box className="box">
          <div className="content">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w300${content.poster_path}`}
              alt="tv show poster" />
            <div className="right">
              <h3 className="title">{content.name}</h3>
              <div className="show-description">
                <p>{content.overview ? content.overview : "No description available"}</p>
              </div>
              <p className="p-tag">First aired: {content.first_air_date}</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}