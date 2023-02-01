import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import './modal.css'

export default function TVModal({
  content,
  displayModal,
  setDisplayModal,
}) {
  //ask about callbacks inside event handlers, directly update state or create a handler function to do it like this:
  const handleClose = () => setDisplayModal(false);

  const style = {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    borderRadius: "10px",
    backgroundColor: "#39445a",
    fontFamily: 'Roboto',
    transform: 'translate(-50%, -50%)',
    minWidth: '300px',
    minHeight: '300px',
    top: '50%',
    left: '50%'
  };

  return (
    <div className="modal">
      <Modal
      className="modal"
        open={displayModal}
        onClose={() => setDisplayModal(false)}
        BackDropComponent={Backdrop}
      >
        <Box sx={style}>
          <div className="content">
            <h3 className="title">{content.name}</h3>
            <img className="poster" src={`https://image.tmdb.org/t/p/w300${content.poster_path}`} />
            <div className="show-description">
              <p>{content.overview ? content.overview : "No description available"}</p>
            </div>
            <p className="p-tag">First aired: {content.first_air_date}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}