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

function Linechart(props: { axis: string; logged: boolean }) {
  const [dataList, setDataList] = useState<number[]>([]);
  const [dataListTs, setDataListTs] = useState<string[]>([]);
  const [resolved, setResolved] = useState<boolean>(true);

  useEffect(() => {
    const db = database;
    const cartRef = ref(db, "/data");
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        const newDataList: number[] = [];
        const newDataListTs: string[] = [];
        const newAlarmList: string[] = [];

        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (props.axis == "x") {
              newDataList.push(data[key].Data.x);
              newAlarmList.push(data[key].Data.alarmx);
            } else if (props.axis == "y") {
              newDataList.push(data[key].Data.y);
              newAlarmList.push(data[key].Data.alarmy);
            } else if (props.axis == "z") {
              newDataList.push(data[key].Data.z);
              newAlarmList.push(data[key].Data.alarmz);
            }

            newDataListTs.push(data[key].Data.timestamp);
          }
        }
        setDataList(newDataList.slice(-15));
        setDataListTs(newDataListTs.slice(-15));
        if (newAlarmList.slice(-1)[0] == "true") {
          setResolved(false);
        }
      } else {
        console.log("Data not found");
      }
    });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <LineChart
        xAxis={[{ scaleType: "point", data: dataListTs }]}
        series={[
          {
            curve: "linear",
            data: dataList,
            showMark: false,
            label: props.axis,
            color: "darkblue",
          },
        ]}
        width={450}
        height={300}
        //margin={{ top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
      />
      {resolved == false ? (
        <div className="grid grid-cols-4 bg-red-600 mx-1 border-t-4 border-white ">
          <div className="col-span-3 flex justify-center items-center">
            <strong>Alarm: OUT OF BOUNDS</strong>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            {props.logged ? (
              <button
                className="border-2 border-white flex justify-center items-center w-20 bg-slate-600 h-6 text-sm"
                onClick={() => setResolved(true)}
              >
                Resolved
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Linechart;
