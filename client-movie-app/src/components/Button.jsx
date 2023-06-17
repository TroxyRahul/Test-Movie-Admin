import React from "react";

function Button({ type, btnLable, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
      {btnLable}
    </button>
  );
}

export default Button;
