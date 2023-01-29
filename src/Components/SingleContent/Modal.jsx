import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

export default function ContentModal({
  content,
  displayModal,
  setDisplayModal,
}) {
  //ask about callbacks inside event handlers, directly update state or create a handler function to do it like this:
  const handleClose = () => setDisplayModal(false);

  const style = {
    position: "absolute",
    border: "4px solid black",
    "background-color": "white",
    top: '50%',
    left: '50%'
  };

  return (
    <div className="modal">
      <Modal
        open={displayModal}
        onClose={() => setDisplayModal(false)}
        BackDropComponent={Backdrop}
      >
        <Box sx={style}>
          <div>
            <h3>{content.title}</h3>
            <img src={content.poster_path} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
