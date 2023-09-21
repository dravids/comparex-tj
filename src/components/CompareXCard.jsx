import React from "react";
import "./../App.css";
import { Card, Stack, CardHeader } from "@mui/material";
import FiberNewIcon from "@mui/icons-material/FiberNew";
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

function CompareXCard(props) {
  return (
    <ThemeProvider theme={theme}>
      <Card key={props.header}>
        <CardHeader
          title={props.header}
          className="comparison-header"
        ></CardHeader>
        {props.items.map((data, i) => {
          return (
            <div key={i}>
              <Stack direction="row">
                <FiberNewIcon className="new-icon"></FiberNewIcon>
                <p className="comparison-each-line-text">{data}</p>
              </Stack>
              {i !== props.items.length - 1 ? <hr></hr> : null}
            </div>
          );
        })}
      </Card>
    </ThemeProvider>
  );
}

export default CompareXCard;
