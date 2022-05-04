import React from "react";

export default function Button({ children }) {
  return (
    <span className="px-4 py-2 text-white uppercase font-bold hover:opacity-75 transition-all ease-linear duration-300 w-full block rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500">
      {children}
    </span>
  );
}
