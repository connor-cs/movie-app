import React from "react";
import Pagination from "@mui/material/Pagination";

export default function PageComponent({ setPage, numOfPages = 10 }) {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0,0)
  };

  return (
    <div>
      <Pagination
        count={numOfPages}
        onChange={(e) => handlePageChange(e.target.innerText)}
        color="primary"
        size="large"
      />
    </div>
  );
}
