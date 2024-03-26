import React from "react";
import Linechart from "../components/Linechart";
import Heading from "../components/Heading";
function Dashboard() {
  return (
    <>
      <Heading text="Dashboard" />
      <div className="grid grid-rows-5">
        <div className="row-span-1 grid  grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1 text-xl flex justify-center items-center bg-blue-800 mx-4 mt-3">
            <strong>X Axis</strong>
          </div>
          <div className="col-span-1 text-xl flex justify-center items-center bg-blue-800 mx-4 mt-3">
            <strong>Y Axis</strong>
          </div>
          <div className="col-span-1 text-xl flex justify-center items-center bg-blue-800 mx-4 mt-3">
            <strong>Z Axis</strong>
          </div>
        </div>
        <div className="row-span-3 grid  grid-cols-3 gap-10">
          <div className="col-span-1 text-xl flex justify-center items-center bg-blue-100 mx-4">
            <Linechart axis="x" />
          </div>
          <div className="col-span-1 text-xl flex justify-center items-center bg-blue-100 mx-4">
            <Linechart axis="y" />
          </div>
          <div className="col-span-1 text-xl flex justify-center items-center bg-blue-100 mx-4">
            <Linechart axis="z" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
