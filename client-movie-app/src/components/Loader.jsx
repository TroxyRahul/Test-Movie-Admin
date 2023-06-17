import React from "react";

function Loader() {
  return (
    <div className="min-h-screen min-w-full bg-gray-700 bg-opacity-50 absolute top-0 left-0">
      <div className="flex justify-center items-center w-full min-h-screen">
        <span className=" text-white loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
}

export default Loader;
