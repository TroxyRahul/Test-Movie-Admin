import React from "react";

function Label({ htmlFor, labelText }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-gray-800">
      {labelText}
    </label>
  );
}

export default Label;
