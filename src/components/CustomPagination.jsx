import React from "react";
import { createTheme } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { ThemeProvider } from "@material-ui/core/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div className="pagination__wrapper">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          hidePrevButton
          hideNextButton
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
