"use client"; // This is a client component
import React, { useEffect, useState } from "react";
import database from "./Firebase";
import { ref, onValue } from "firebase/database";
import { LineChart } from "@mui/x-charts/LineChart";

// Define interface for data object
interface DataItem {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

function Linechart(props: { axis: string }) {
  const [dataList, setDataList] = useState<number[]>([]);
  const [dataListTs, setDataListTs] = useState<string[]>([]);

  useEffect(() => {
    const db = database;
    const cartRef = ref(db, "/data");
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        const newDataList: number[] = [];
        const newDataListTs: string[] = [];
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (props.axis == "x") {
              newDataList.push(data[key].Data.x);
            } else if (props.axis == "y") {
              newDataList.push(data[key].Data.y);
            } else if (props.axis == "z") {
              newDataList.push(data[key].Data.z);
            }

            newDataListTs.push(data[key].Data.timestamp);
          }
        }
        setDataList(newDataList.slice(-15));
        setDataListTs(newDataListTs.slice(-15));
      } else {
        console.log("Data not found");
      }
    });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <LineChart
        xAxis={[{ data: dataListTs }]}
        series={[
          {
            data: dataList,
          },
        ]}
        width={450}
        height={300}
        //margin={{ top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}

export default Linechart;
