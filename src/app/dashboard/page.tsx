"use client";
import { NextResponse } from "next/server";
import React, { useState } from "react";
import Linechart from "../components/Linechart";
import { getDatabase, ref, child, push, update } from "firebase/database";
import database from "../components/Firebase";
import Heading from "../components/Heading";
function Dashboard() {
  const [time, setTime] = useState("1");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const submitData = { time: time };
    const db = database;
    const cartRef = ref(db, "/config");
    update(cartRef, submitData); // Wrap submitData inside an array
  };

  return (
    <>
      <Heading text="Dashboard" />
      <div className="grid grid-rows-5">
        <div className="row-span-1 grid  grid-cols-3 gap-x-10 mt-10">
          <div className="border-solid border-b-0 border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-800 mx-4 mt-3">
            <strong>X Axis</strong>
          </div>
          <div className="border-solid border-b-0 border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-800 mx-4 mt-3">
            <strong>Y Axis</strong>
          </div>
          <div className="border-solid border-b-0 border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-800 mx-4 mt-3">
            <strong>Z Axis</strong>
          </div>
        </div>
        <div className="row-span-3 grid  grid-cols-3 gap-10">
          <div className=" border-solid border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-100 mx-4">
            <Linechart axis="x" />
          </div>
          <div className="border-solid border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-100 mx-4">
            <Linechart axis="y" />
          </div>
          <div className="border-solid border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-100 mx-4">
            <Linechart axis="z" />
          </div>
        </div>
        <div className="row-span-1 grid  grid-cols-3 gap-10">
          <form
            onSubmit={handleSubmit}
            className=" col-span-2 flex justify-center items-center text-black"
          >
            <input
              type="text"
              name="time"
              value={time}
              placeholder={time.toString()} // Convert time to a string
              onChange={(e) => setTime(e.target.value)}
              className="border-solid border-blue-500 border-4  p-2 px-4 rounded outline-none w-1/3"
            />
            <button
              type="submit"
              className=" border-solid border-4 bg-blue-500 hover:bg-blue-800 text-white p-2 px-4 rounded-md mx-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
