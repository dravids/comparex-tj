import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import Popover from "@mui/material/Popover";
import "./../App.css";
import ChatbotImage from "./../utilities/images/Chatbot.png";
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

const Chatbot = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ThemeProvider theme={theme}>
    <div className='chatbot-position'>
      <IconButton onClick={handleClick} className="chat-icon-button" color="primary">
        <ChatIcon fontSize="large" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <img src={ChatbotImage} alt="Chatbot"></img>
      </Popover>
    </div>
    </ThemeProvider>
  );
};

export default Chatbot;
