import React from "react";

export default function CheckBoxItem({ hint, name }) {
  return (
    <div className="flex items-center ">
      <label className="capitalize mr-2 w-1/3" htmlFor={hint}>
        {hint}
      </label>
      <input className="cursor-pointer" id={hint} name={name} type="checkbox" />
    </div>
  );
}
