import React, {useState} from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

export default function MovieModal({id, displayModal, setDisplayModal}){
  const key = process.env.REACT_APP_API_KEY;
  const [movieDetails, setMovieDetails] = useState()

  const getData = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
    const json = await data.json()
  }

  return (
    <div className='movie-modal'>
      <Modal
        open={displayModal}
        onClose={()=>setDisplayModal(false)}
        >
        <Box>

        </Box>
      </Modal>
    </div>
  )
}
