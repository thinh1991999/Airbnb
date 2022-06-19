import { useSelector } from "react-redux";

function SearchBox({ children }) {
  const { left, right } = useSelector((state) => state.header.elementSearch);
  return (
    <div
      className={`text-black absolute top-[calc(100%_+_10px)]  py-5  rounded-3xl left-${left} right-${right} bg-gray-100  dark:bg-white z-30`}
    >
      {children}
    </div>
  );
}

export default SearchBox;
