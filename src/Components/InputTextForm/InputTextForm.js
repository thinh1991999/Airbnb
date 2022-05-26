import React from "react";

export default function InputTextForm({
  disabled = false,
  name,
  hint,
  handleFocus,
  handleChange,
  values,
  errors,
  type = "text",
  addMode = false,
}) {
  return (
    <>
      <label className="capitalize font-bold" htmlFor={hint}>
        {hint}
      </label>
      <input
        disabled={disabled}
        id={hint}
        type={type}
        placeholder={hint}
        name={name}
        value={type === "date" && !addMode ? values : values[name]}
        onFocus={handleFocus}
        onChange={handleChange}
        className={`my-2 w-full placeholder:capitalize bg-gray-300  dark:bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
          errors[name] ? `border-red-600` : `border-gray-400`
        }`}
      />
      {errors[name] && <p className="text-red-600">{errors[name]}</p>}
    </>
  );
}
