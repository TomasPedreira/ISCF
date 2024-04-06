"use client";
import { ref, onValue, update, set } from "firebase/database";
import database from "../components/Firebase";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";

function page() {
  const [userList, setUserList] = useState<string[]>([]);
  const [passList, setPassList] = useState<string[]>([]);
  const [userName, setUserName] = useState("username");
  const [password, setPassword] = useState("password");
  const [logged, setLogged] = useState(false);
  const [alert, setAlert] = useState(false);
  const db = database;
  const logRef = ref(db, "/login");
  const userRef = ref(db, "/users");

  const handleLogOut = async () => {
    const submitData = { logged: "False" };
    setLogged(false);
    update(logRef, submitData); // Wrap submitData inside an array
  };

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      const users = snapshot.val();
      if (!!users) {
        const newUserList: string[] = [];
        const newPassList: string[] = [];
        for (const key in users) {
          if (Object.prototype.hasOwnProperty.call(users, key)) {
            console.log(users[key].user, users[key].pass);
            newUserList.push(users[key].user);
            newPassList.push(users[key].pass);
          }
        }
        setUserList(newUserList);
        setPassList(newPassList);
      }
    });
    onValue(logRef, (snapshot) => {
      const loggin = snapshot.val();
      if (!!loggin) {
        if (loggin.logged == "True") {
          setLogged(true);
        }
      }
    });
  }, []);

  const handleLogIn = async (e: { preventDefault: () => void }) => {
    console.log(userName, password);
    e.preventDefault();
    let isLoggedIn = false;
    for (let i = 0; i < userList.length; i++) {
      if (userList[i] === userName && passList[i] === password) {
        isLoggedIn = true;
        break;
      }
    }
    if (isLoggedIn) {
      setLogged(true);
      setAlert(false);
      const submitData = { logged: "True", user: userName };
      update(logRef, submitData); // Wrap submitData inside an array
    } else {
      setLogged(false);
      setAlert(true);
    }
  };

  return (
    <>
      <Heading text="Log In" />
      <div className="grid grid-rows-2 pt-40  ">
        {!logged ? (
          <div className="row-span-1 grid grid-cols-6  gap-10">
            <div className="col-span-1" />
            <div className="col-span-4 flex justify-center items-center">
              <form
                className="flex justify-center items-center text-black"
                onSubmit={handleLogIn}
              >
                <input
                  className="border-solid border-4 border-blue-500 p-2 px-4 rounded outline-none"
                  type="text"
                  placeholder="username"
                  onChange={(e) => setUserName(e.target.value.toString())}
                />
                <input
                  className="border-solid border-4 border-blue-500 p-2 px-4 rounded outline-none"
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value.toString())}
                />
                <button className="border-solid border-4 border-white bg-blue-500 hover:bg-blue-800 text-white p-2 px-4 rounded-md mx-5">
                  <strong>Log In</strong>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="row-span-1  grid grid-cols-12 pt-10 gap-10">
            <div className="col-span-4" />
            <div className="col-span-3  bg-green-500 border-4  border-white border-solid flex justify-center items-center">
              Youre logged in
            </div>
            <div className="col-span-1">
              <button
                className="border-4 h-10 w-20 border-white flex justify-center items-center bg-slate-600"
                onClick={handleLogOut}
              >
                <strong>Log out</strong>
              </button>
            </div>
          </div>
        )}

        {alert ? (
          <div className="row-span-1 grid grid-cols-12 pt-10">
            <div className="col-span-4" />
            <div className="col-span-3  bg-red-500 border-4  border-white border-solid flex justify-center items-center">
              Your log in isn't available
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default page;
