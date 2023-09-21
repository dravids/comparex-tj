import React from "react";
import Button from "@mui/material/Button";
import "./../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EB4C38",
    },
  },
  typography: {
    fontFamily: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"].join(
      ","
    ),
  },
});

function CompareXButton(props) {
  console.log(props.className === "search-button"?props:null)
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        className={props.className}
        onClick={
          props.className === "search-button"
            ? () => {
              //console.log("props.currentSearchBarValue", props.currentSearchBarValue);
                props.setSearchValue(props.currentSearchBarValue);
                props.setSearchButtonClicked(true);
              }
            : null
        }
      >
        {props.buttonName}
      </Button>
      {/* <Button variant="contained" className={props.className}>{props.buttonName}</Button> */}
    </ThemeProvider>
  );
}

export default CompareXButton;
