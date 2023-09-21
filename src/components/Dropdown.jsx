import React from "react";
import {InputLabel,MenuItem,FormControl, Select, Box} from "@mui/material";
import "./../App.css";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EB4C38"
    }
  },
  typography: {
    fontFamily: [
      'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'
    ].join(",")
  }
})

function Dropdown(props) {

  const handleChange = (event) => {
    props.setDropDownName(event.target.value);
  };
  
  return (
    <ThemeProvider theme={theme}>
    <FormControl className={props.className}>
      <InputLabel>product</InputLabel>
      <Select
        value={props.dropDownName}
        onChange={handleChange}
        label="product"
        className="dropdown-select"
      >
        <MenuItem value={"A"}>ProductA</MenuItem>
        <MenuItem value={"B"}>ProductB</MenuItem>
        <MenuItem value={"C"}>ProductC</MenuItem>
        <MenuItem value={"D"}>ProductD</MenuItem>
      </Select>
    </FormControl>
    </ThemeProvider>
  );
}

export default Dropdown;
