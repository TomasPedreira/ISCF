import Link from "next/link";
import React from "react";

function Heading(props: { text: string }) {
  return (
    <div className="grid grid-rows-1">
      <div className="row-span-1 grid grid-cols-3">
        <div className="col-span-3 ">
          <div className="grid grid-cols-3 h-20 bg-blue-300">
            <div className="col-span-1 flex justify-center text-center text-6xl items-center">
              <strong>ISCF</strong>
            </div>
            <div className="col-span-1 flex justify-end text-center text-3xl items-center">
              <a
                href="https://www.linkedin.com/in/tomas-pedreira-563a3a234/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Tomás Pedreira</strong>
              </a>
            </div>
            <div className="col-span-1 flex justify-center text-center text-3xl items-center">
              <button>
                <a
                  className="mg"
                  href="https://www.linkedin.com/in/antoniocmdoo21/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>António Ó</strong>
                </a>
              </button>
            </div>
          </div>
          <div className=" grid grid-cols-9 h-10 bg-blue-400">
            <div className="col-span-3 text-xl flex justify-center items-center">
              <strong>{props.text}</strong>
            </div>
            <div className="col-span-4" />
            {props.text == "Home" ? (
              <div className="col-span-1" />
            ) : (
              <div className="col-span-1 text-xl flex justify-center items-center border-solid border-2 bg-blue-500 hover:bg-blue-800 rounded-2xl">
                <Link href="/home">
                  <strong>Voltar</strong>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Heading;
