import React from "react";
import { useSelector } from "react-redux";

export default function SearchBoxMobile() {
  const elementSearchMobile = useSelector(
    (state) => state.header.elementSearchMobile
  );

  if (!elementSearchMobile) return <></>;
  return (
    <div
      className={`top-${elementSearchMobile?.top} bottom-${elementSearchMobile?.bottom} left-${elementSearchMobile?.left} right-${elementSearchMobile?.right} absolute rounded-3xl bg-gray-100 dark:bg-gray-900  p-5`}
    >
      {elementSearchMobile?.component}
    </div>
  );
}
