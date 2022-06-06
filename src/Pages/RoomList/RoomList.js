import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { httpServ } from "../../ServiceWorkers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Map from "../../Components/PageRoomList/Map/Map";
import PaginatedItems from "../../Components/PageRoomList/PaginatedItems/PaginatedItems";
import { useDispatch, useSelector } from "react-redux";
import {
  setScrollActive,
  setSearchActive,
} from "../../Store/HeaderSlice/HeaderSlice";

function RoomList() {
  const { locId = "" } = useParams();
  const dispatch = useDispatch();
  const searchActive = useSelector((state) => state.header.searchActive);
  const showSearch = useSelector((state) => state.header.showSearch);
  const language = useSelector((state) => state.root.language);

  const [roomsData, setRoomsData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [fullMap, setFullMap] = useState(false);

  const handleFullMap = () => {
    setFullMap(!fullMap);
  };
  const setCurrentItemsFunc = useCallback((items) => {
    setCurrentItems(items);
  }, []);

  useEffect(() => {
    httpServ
      .layDanhSachPhong(
        {
          locationId: locId,
        },
        true
      )
      .then((res) => {
        setRoomsData(res.data);
      });
  }, [locId]);

  useEffect(() => {
    dispatch(setScrollActive(false));
    dispatch(setSearchActive(false));
  }, []);

  return (
    <div className={`${searchActive ? "pt-[200px]" : "pt-[92px]"} `}>
      <div className="flex md:container m-auto lg:px-20 md:px-10 px-5 lg:flex-row lg:items-stretch lg:justify-end lg:min-h-[800px] flex-col-reverse ">
        <div
          className={`${
            fullMap ? "w-0 h-0" : "lg:w-[60%]  w-full"
          } pt-4 overflow-hidden pr-5`}
        >
          <div className="h-[calc(100%_-_200px)]">
            <PaginatedItems
              itemsPerPage={4}
              items={roomsData}
              setCurrentItemsFunc={setCurrentItemsFunc}
            />
          </div>
        </div>
        <div
          className={`${
            fullMap ? "w-full " : "lg:w-[40%]  w-full"
          } transition-all duration-300 ease-linear `}
        >
          <div
            className={` ${
              searchActive && showSearch
                ? fullMap
                  ? "h-full"
                  : "  lg:h-[calc(100%_-_200px)] top-[200px]"
                : fullMap
                ? "h-full"
                : " lg:h-[calc(100%_-_92px)] top-[92px]"
            } lg:sticky h-full`}
          >
            <div className="h-full relative">
              <Map currentItems={currentItems} />
              <button
                onClick={handleFullMap}
                className="lg:flex hidden absolute hover:opacity-80 top-5 left-5 px-4 py-4  justify-center items-center rounded-xl text-black bg-white"
              >
                {fullMap ? (
                  <span className="flex items-center">
                    <AiOutlineRight /> {language.RoomListShow}
                  </span>
                ) : (
                  <AiOutlineLeft />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomList;
