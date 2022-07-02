import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { httpServ } from "../../ServiceWorkers";
import { FiMap } from "react-icons/fi";
import { BsListStars } from "react-icons/bs";
import Map from "../../Components/PageRoomList/Map/Map";
import PaginatedItems from "../../Components/PageRoomList/PaginatedItems/PaginatedItems";
import { useDispatch, useSelector } from "react-redux";
import {
  setScrollActive,
  setSearchActive,
  setShowSearch,
} from "../../Store/HeaderSlice/HeaderSlice";
import "./RoomList.css";

function RoomList() {
  const { locId = "" } = useParams();
  const dispatch = useDispatch();
  const searchActive = useSelector((state) => state.header.searchActive);
  const showSearch = useSelector((state) => state.header.showSearch);
  const language = useSelector((state) => state.root.language);

  const [roomsData, setRoomsData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [fullMap, setFullMap] = useState(false);
  const [fullMapMobile, setFullMapMobile] = useState(false);

  const handleFullMap = () => {
    setFullMap(!fullMap);
  };
  const setCurrentItemsFunc = useCallback((items) => {
    setCurrentItems(items);
  }, []);

  useEffect(() => {
    dispatch(setSearchActive(false));
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
    dispatch(setShowSearch(true));
    dispatch(setScrollActive(false));
    dispatch(setSearchActive(false));
  }, []);

  return (
    <div
      id="RoomList"
      className={`${searchActive ? "pt-[200px]" : "pt-[92px]"} `}
    >
      <div className="flex md:container m-auto lg:px-20 md:px-10 px-5 lg:flex-row lg:items-stretch lg:justify-end min-h-[800px] flex-col-reverse justify-end">
        <div
          className={`${fullMap ? "w-0 h-0" : "lg:w-[60%]  w-full"} ${
            fullMapMobile ? "lg:h-auto h-0" : ""
          } pt-4 overflow-hidden lg:pr-5`}
        >
          <div className="h-[calc(100%_-_200px)]">
            {roomsData.length > 0 ? (
              <PaginatedItems
                itemsPerPage={4}
                items={roomsData}
                setCurrentItemsFunc={setCurrentItemsFunc}
              />
            ) : (
              <div className="">
                <p className="text-center h-full block">
                  {language.NothingToSee}
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className={`${
            fullMap ? "w-full h-[800px]" : "lg:w-[40%] lg:h-auto  w-full "
          } ${
            fullMapMobile ? "lg:h-auto h-[800px]" : "h-0"
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
      <button
        onClick={() => setFullMapMobile(!fullMapMobile)}
        className="lg:hidden min-w-[200px] fixed bottom-5 left-[50%] -translate-x-[50%] px-5 py-3 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-900 transition-all duration-300 ease-linear bg-gray-100 dark:bg-black rounded-full text-lg font-bold"
      >
        {fullMapMobile ? (
          <>
            {language.showList} <BsListStars className="ml-2" />
          </>
        ) : (
          <>
            {language.showMap} <FiMap className="ml-2" />
          </>
        )}
      </button>
    </div>
  );
}

export default RoomList;
