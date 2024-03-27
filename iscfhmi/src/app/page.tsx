import Link from "next/link";
import Heading from "./components/Heading";

function Home() {
  return (
    <>
      <Heading text="Home" />
      <div className="grid grid-rows-3 gap-y-10">
        <div className="row-span-1" />
        <div className="row-span-1 grid grid-cols-3 h-20">
          <div className="col-span-1" />
          <div className="col-span-1 flex justify-center items-center text-4xl border-solid border-4 bg-blue-500 hover:bg-blue-800 mx-20 rounded-2xl">
            <Link href="/login">
              <strong>Log In</strong>
            </Link>
          </div>
        </div>
        <div className="row-span-1 grid grid-cols-3 ">
          <div className="col-span-1" />
          <div className="col-span-1 flex justify-center items-center text-4xl border-solid border-4 bg-blue-500 hover:bg-blue-800 mx-20 rounded-2xl">
            <Link href="/dashboard">
              <strong>Dashboard</strong>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
