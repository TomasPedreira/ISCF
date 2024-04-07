"use client";
import { NextResponse } from "next/server";
import React, { use, useEffect, useState } from "react";
import Linechart from "../components/Linechart";
import { ref, update, onValue } from "firebase/database";
import database from "../components/Firebase";
import Heading from "../components/Heading";
function Dashboard() {
  const [time, setTime] = useState("1");
  const [logged, setLogged] = useState(false);
  const db = database;
  const logRef = ref(db, "/login");
  const configRef = ref(db, "/config");
  useEffect(() => {
    onValue(logRef, (snapshot) => {
      const loggin = snapshot.val();
      if (!!loggin) {
        if (loggin.logged == "True") {
          setLogged(true);
        } else {
          setLogged(false);
        }
      }
    });
  });
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const submitData = { time: time };

    update(configRef, submitData); // Wrap submitData inside an array
  };

  return (
    <>
      <Heading text="Dashboard" />
      <div className="grid grid-rows-6">
        <div className="row-span-1 grid  grid-cols-3 gap-x-10 mt-10">
          <div className="border-solid border-b-0 border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-800 mx-4 mt-3">
            <strong>X Accel</strong>
          </div>
          <div className="border-solid border-b-0 border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-800 mx-4 mt-3">
            <strong>Y Accel</strong>
          </div>
          <div className="border-solid border-b-0 border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-800 mx-4 mt-3">
            <strong>Z Accel</strong>
          </div>
        </div>
        <div className="row-span-4 grid  grid-cols-3 gap-10">
          <div className=" border-solid border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-100 mx-4">
            <Linechart axis="x" logged={logged} />
          </div>
          <div className="border-solid border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-100 mx-4">
            <Linechart axis="y" logged={logged} />
          </div>
          <div className="border-solid border-white border-4 col-span-1 text-xl flex justify-center items-center bg-blue-100 mx-4">
            <Linechart axis="z" logged={logged} />
          </div>
        </div>
        <div className="row-span-1 grid  grid-cols-3 gap-10">
          {logged ? (
            <form
              onSubmit={handleSubmit}
              className=" col-span-2 flex justify-center items-center text-black"
            >
              <input
                type="number"
                name="time"
                placeholder="Sample Time" // Convert time to a string
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
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
