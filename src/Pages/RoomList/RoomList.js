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
      <div className="flex items-stretch justify-end min-h-[800px]">
        <div
          className={`${
            fullMap ? "w-0 h-0" : "w-[60%] px-5"
          } pt-4 overflow-hidden `}
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
            fullMap ? "w-full " : "w-[40%]"
          } transition-all duration-300 ease-linear `}
        >
          <div
            className={`${
              searchActive && showSearch
                ? "  h-[calc(100%_-_200px)] top-[200px]"
                : " h-[calc(100%_-_92px)] top-[92px]"
            } sticky `}
          >
            <div className="h-full relative">
              <Map currentItems={currentItems} />
              <button
                onClick={handleFullMap}
                className="absolute hover:opacity-80 top-5 left-5 px-4 py-4 flex justify-center items-center rounded-xl text-black bg-white"
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
