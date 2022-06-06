import React from "react";

export default function CheckBoxItem({ hint, name, values, handleChange }) {
  return (
    <div className="flex items-center ">
      <label className="capitalize mr-2 sm:w-1/3 flex-1" htmlFor={hint}>
        {hint}
      </label>
      <input
        className="cursor-pointer"
        id={hint}
        name={name}
        type="checkbox"
        checked={values[name]}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
