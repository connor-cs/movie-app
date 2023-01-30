import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import './modal.css'

export default function ContentModal({
  content,
  displayModal,
  setDisplayModal,
}) {
  //ask about callbacks inside event handlers, directly update state or create a handler function to do it like this:
  const handleClose = () => setDisplayModal(false);
  const key = process.env.REACT_APP_API_KEY;
  const [modalContent, setModalContent] = useState()

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

  // const getData = async () => {
  //   const data = await fetch(`https://api.themoviedb.org/3/tv/${content}?api_key=${key}&language=en-US`)
  //   const json = await data.json()
  //   setModalContent(json)
  //   //these console logs all work:
  //   console.log('json:', json)
  //   console.log('name:', json.name)
  //   console.log('type:', json.type)
  //   // but this one is undefined:
  //   console.log('modalContent:', modalContent)
  // }

  // useEffect(()=> {
  //   getData()
  // }, [])

  return (
    <div className="modal">
      <Modal
        open={displayModal}
        onClose={() => setDisplayModal(false)}
        BackDropComponent={Backdrop}
      >
        <Box sx={style}>
          <div>
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