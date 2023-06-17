import React, { Children } from "react";
import { RiMovie2Line } from "react-icons/ri";

function Layout1({ children, headingLabel }) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center  px-6 py-12 lg:px-8 ">
      <div className="border border-violet-500 w-full md:w-1/3  p-7 rounded-md shadow-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <RiMovie2Line className="mx-auto h-10 w-auto text-violet-500" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
            {headingLabel}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Layout1;
