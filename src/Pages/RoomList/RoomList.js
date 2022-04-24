import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpServ } from "../../ServiceWorkers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Map from "../../Components/RoomList/Map/Map";
import PaginatedItems from "../../Components/RoomList/PaginatedItems/PaginatedItems";

function RoomList() {
  const { locId } = useParams();
  const [roomsData, setRoomsData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);

  const setCurrentItemsFunc = useCallback((items) => {
    setCurrentItems(items);
  }, []);

  useEffect(() => {
    httpServ
      .layDanhSachPhong({
        locationId: locId,
        limit: 5,
      })
      .then((res) => {
        setRoomsData(res.data);
      });
  }, [locId]);

  return (
    <div className="pt-[200px] h-screen w-full px-5">
      <div className="flex">
        <div className="w-[60%]">
          <div className="w-full">
            <PaginatedItems
              itemsPerPage={4}
              items={roomsData}
              setCurrentItemsFunc={setCurrentItemsFunc}
            />
          </div>
        </div>
      </div>
      <Map currentItems={currentItems} />
    </div>
  );
}

export default RoomList;
