import React from "react";

export default function InputTextForm({
  name,
  hint,
  handleFocus,
  handleChange,
  values,
  errors,
}) {
  return (
    <>
      <label className="capitalize" htmlFor={hint}>
        {hint}
      </label>
      <input
        id={hint}
        type="text"
        placeholder={hint}
        name={name}
        value={values[name]}
        onFocus={handleFocus}
        onChange={handleChange}
        className={`my-2 w-full placeholder:capitalize bg-gray-700 px-3 py-2 border-2  outline-none rounded-md ${
          errors[name] ? `border-red-600` : `border-gray-400`
        }`}
      />
      {errors[name] && <p className="text-red-600">{errors[name]}</p>}
    </>
  );
}
