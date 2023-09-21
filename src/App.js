import { useEffect, useState } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { Row, Col } from "react-grid-system";
import "./App.css";
import CXIcon from "./utilities/icons/CX.png";
import FeedbackIcon from "./utilities/icons/Feedback.png";
import ReleasesIcon from "./utilities/icons/Releases.png";
import ScalaIcon from "./utilities/icons/Scala.png";
import JavaIcon from "./utilities/icons/Java.png";
import RIcon from "./utilities/icons/R.png";
import PythonIcon from "./utilities/icons/Python.png";
import HomeIcon from "./utilities/icons/Home.png";
import Dropdown from "./components/Dropdown";
import Searchbar from "./components/Searchbar";
import CompareXButton from "./components/CompareXButton";
import ComparisonDetails from "./components/ComparisonDetails";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chatbot from "./components/Chatbot";

// Search using Trie data structure
function TrieNode() {
  const children = {};
  let isEndOfWord = false;

  return { children, isEndOfWord };
}

function Trie() {
  const [root] = useState(TrieNode);

  function insert(month) {
    let node = root;

    for (const char of month) {
      if (!node.children[char]) {
        node.children[char] = TrieNode();
      }
      node = node.children[char];
    }

    node.isEndOfWord = true;
  }

  function search(month) {
    let node = root;

    for (const char of month) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }

    return node.isEndOfWord;
  }

  function getWordsWithPrefix(prefix) {
    const words = [];

    function dfs(node, currentWord) {
      if (node.isEndOfWord) {
        words.push(currentWord);
      }

      for (const char in node.children) {
        dfs(node.children[char], currentWord + char);
      }
    }

    let node = root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return words;
      }
      node = node.children[char];
    }

    dfs(node, prefix);
    return words;
  }

  return { insert, search, getWordsWithPrefix };
}

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

function App() {
  const [firstDropDown, setFirstDropDown] = useState("A");
  const [secondDropDown, setSecondDropDown] = useState("B");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const monthTrie = Trie();
  const listOfMonths = [
    "August",
    "July",
    "June",
    "May",
    "April",
    "March",
    "February",
    "January",
  ];
  const [monthOfDataToBeFetched, setMonthOfDataToBeFetched] = useState(
    listOfMonths[0]
  );
  const [searchValue, setSearchValue] = useState("");

  listOfMonths.forEach((month) => {
    monthTrie.insert(month);
  });

  const triggerTrieSearch = () => {
    const isMonthValid = monthTrie.search(searchValue);
    if (isMonthValid) {
      setMonthOfDataToBeFetched(searchValue);
    } else {
      const prefixSuggestions = monthTrie.getWordsWithPrefix(searchValue);
      if (prefixSuggestions.length > 0) {
        setMonthOfDataToBeFetched(prefixSuggestions[0]);
      }
    }
  };

  // trigger search
  useEffect(() => {
    if (searchButtonClicked === true) {
      setSearchButtonClicked(false);
      triggerTrieSearch();
    }
  }, [searchButtonClicked]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Row className="outer-row-container">
          <Col
            xs={1}
            sm={1}
            md={1}
            lg={1}
            xl={1}
            className="navigator-grid-item"
          >
            <Stack direction="column" spacing={25} alignItems={"center"}>
              <Stack direction="column" spacing={2} alignItems={"center"}>
                <img src={CXIcon} alt="CX Icon"></img>
              </Stack>
              <Stack direction="column" spacing={2} alignItems={"center"}>
                <img
                  src={HomeIcon}
                  alt="Home Icon"
                  width="60%"
                  height="60%"
                ></img>
                <img
                  src={PythonIcon}
                  alt="Python Icon"
                  width="60%"
                  height="60%"
                ></img>
                <img src={RIcon} alt="R Icon" width="60%" height="60%"></img>
                <img
                  src={JavaIcon}
                  alt="Java Icon"
                  width="60%"
                  height="60%"
                ></img>
                <img
                  src={ScalaIcon}
                  alt="Scala Icon"
                  width="60%"
                  height="60%"
                ></img>
              </Stack>
              <Stack direction="column" spacing={2} alignItems={"center"}>
                <img
                  src={ReleasesIcon}
                  alt="Release Icon"
                  width="60%"
                  height="60%"
                ></img>
                <img
                  src={FeedbackIcon}
                  alt="Feedback Icon"
                  width="60%"
                  height="60%"
                ></img>
              </Stack>
            </Stack>
          </Col>
          <Col
            xs={11}
            sm={11}
            md={11}
            lg={11}
            xl={11}
            className="content-grid-item"
            style={{ paddingRight: "0%" }}
          >
            <Row className="marketplace-class">
              <Paper
                variant="elevation"
                style={{ width: "100%", margin: 0, alignItems: "center" }}
              >
                <Stack direction="row" alignItems={"center"} spacing={100}>
                  <Typography variant="h4" className="marketplace-text">Marketplace Comparison</Typography>
                  <CompareXButton
                    buttonName="Download report"
                    className="download-report-button"
                  ></CompareXButton>
                </Stack>
              </Paper>
            </Row>

            <Row className="row-common-class">
              <Typography variant="h5" className="compare-question-text" style={{marginTop: "30px"}}>
                What would you like to compare today?
              </Typography>
            </Row>
            <Row className="row-common-class" style={{marginTop: "1em"}}>
              <Stack direction="row" spacing={2}>
                <Dropdown
                  className="first-drop-down"
                  dropDownName={firstDropDown}
                  setDropDownName={setFirstDropDown}
                ></Dropdown>
                <Dropdown
                  className="second-drop-down"
                  dropDownName={secondDropDown}
                  setDropDownName={setSecondDropDown}
                ></Dropdown>
              </Stack>
            </Row>
            <br></br>
            <Row className="row-common-class">
              <Searchbar
                setSearchValue={setSearchValue}
                setSearchButtonClicked={setSearchButtonClicked}
                latestMonth={listOfMonths[0]}
              ></Searchbar>
            </Row>
            {/* <Chatbot></Chatbot> */}
            <Row className="row-common-class">
              <ComparisonDetails
                month={monthOfDataToBeFetched}
                comparisonType={"Compare" + firstDropDown + secondDropDown}
                A={firstDropDown}
                B={secondDropDown}
                listOfMonths={listOfMonths}
              ></ComparisonDetails>
            </Row>
          </Col>
        </Row>
      </div>
    </ThemeProvider>
  );
}

export default App;
