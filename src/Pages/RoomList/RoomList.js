import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { httpServ } from "../../ServiceWorkers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Map from "../../Components/RoomList/Map/Map";
import PaginatedItems from "../../Components/RoomList/PaginatedItems/PaginatedItems";
import Loading from "../../Components/Loading/Loading";

function RoomList() {
  const { locId = "" } = useParams();
  const [roomsData, setRoomsData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [fullMap, setFullMap] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleFullMap = () => {
    setFullMap(!fullMap);
  };
  console.log(fullMap);
  const setCurrentItemsFunc = useCallback((items) => {
    setCurrentItems(items);
  }, []);

  useEffect(() => {
    setLoading(true);
    httpServ
      .layDanhSachPhong({
        locationId: locId,
      })
      .then((res) => {
        setLoading(false);
        setRoomsData(res.data);
      });
  }, [locId]);
  if (loading) {
    return (
      <div className="pt-[200px]">
        <div className="flex items-stretch justify-end min-h-[800px]">
          <div
            className={`${
              fullMap ? "w-0" : "w-[60%] px-5"
            }     overflow-hidden `}
          >
            <div className="h-[calc(100%_-_200px)]">
              <Loading />
            </div>
          </div>
          <div
            className={`${
              fullMap ? "w-full" : "w-[40%]"
            } transition-all duration-300 ease-linear`}
          >
            <div className="h-[calc(100%_-_200px)] sticky top-[200px]">
              <Loading />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[200px]">
      <div className="flex items-stretch justify-end min-h-[800px]">
        <div
          className={`${fullMap ? "w-0" : "w-[60%] px-5"}     overflow-hidden `}
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
            fullMap ? "w-full" : "w-[40%]"
          } transition-all duration-300 ease-linear`}
        >
          <div className="h-[calc(100%_-_200px)] sticky top-[200px]">
            <div className="h-full relative">
              <Map currentItems={currentItems} />
              <button
                onClick={handleFullMap}
                className="absolute hover:opacity-80 top-5 left-5 px-4 py-4 flex justify-center items-center rounded-xl bg-white"
              >
                {fullMap ? (
                  <span className="flex items-center">
                    <AiOutlineRight /> Hiển thị danh sách
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