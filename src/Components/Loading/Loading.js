import { Circles } from "react-loading-icons";
import { useSelector } from "react-redux";

function Loading() {
  const loading = useSelector((state) => state.loading.loading);

  return loading ? (
    <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-black/[0.5] z-20">
      <div className="">
        <Circles height={"10em"} width={"10em"} />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Loading;
