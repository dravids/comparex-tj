import React, { useEffect, useState } from "react";
import "./../App.css";
import compareXData from "./../data/compareXData.json";
import { Stack } from "@mui/material";
import CompareXCard from "./CompareXCard";

function ComparisonDetails(props) {
  const [combinedData, setCombinedData] = useState([]);
  const [latestMonthData, setLatestMonthData] = useState([]);
 
  useEffect(() => {
    if (props.A !== props.B) {
      if (
        props.comparisonType in compareXData["monthly_comparison"][props.month]
      ) {
        setLatestMonthData(
          compareXData["monthly_comparison"][props.month][props.comparisonType]
        );
      } else {
        setLatestMonthData([]);
      }
      // write promise and then here
      let currentCombinedData = [];
      for (const monthName of props.listOfMonths) {
        if (compareXData["monthly_comparison"][props.month] !== monthName) {
          if (
            props.comparisonType in
            compareXData["monthly_comparison"][props.month]
          ) {
            currentCombinedData = [
              ...currentCombinedData,
              ...compareXData["monthly_comparison"][props.month][
                props.comparisonType
              ],
            ];
          }
        }
      }
      setCombinedData(currentCombinedData);
    } else {
      setLatestMonthData([]);
      setCombinedData([]);
    }
  }, [
    props.month,
    props.comparisonType,
    props.A,
    props.B,
    props.listOfMonths,
  ]);

  return (
    <Stack direction="column" spacing={2} className="comparison-details">
      <CompareXCard
        header={props.month + " comparison"}
        items={latestMonthData}
      ></CompareXCard>
      <CompareXCard
        header={"Overall comparison"}
        items={combinedData}
      ></CompareXCard>
    </Stack>
  );
}

export default ComparisonDetails;
