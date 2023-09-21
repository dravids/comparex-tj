import { React, useState } from "react";
import { FormControl, InputAdornment, TextField, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CompareXButton from "./CompareXButton";

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

function Searchbar(props) {
  const [currentSearchBarValue, setCurrentSearchBarValue] = useState("");
  const [showClearIcon, setShowClearIcon] = useState("none");

  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    const currentInputValue = event.target.value.toLowerCase();
    const camelCaseFormattedInputValue = currentInputValue.charAt(0).toUpperCase() + currentInputValue.slice(1);
    setCurrentSearchBarValue(camelCaseFormattedInputValue);
  };

  const handleClickOfClear = () => {
    setCurrentSearchBarValue("");
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl className="searchbar-form-control" style={{marginBottom: "1em"}}>
        <Stack direction="row">
          <TextField
            size="small"
            variant="outlined"
            onChange={handleChange}
            value={currentSearchBarValue}
            className="seachbar-textfield"
            placeholder="What can we help you find?"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon }}
                    onClick={handleClickOfClear}
                  >
                    <ClearIcon />
                  </InputAdornment>
                </>
              ),
            }}
          />
          <CompareXButton
            buttonName="Search"
            className="search-button"
            currentSearchBarValue={currentSearchBarValue}
            setSearchValue={props.setSearchValue}
            setSearchButtonClicked={props.setSearchButtonClicked}
          ></CompareXButton>
        </Stack>
      </FormControl>
    </ThemeProvider>
  );
}

export default Searchbar;
