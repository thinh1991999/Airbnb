import React from "react";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import Circles from "react-loading-icons/dist/components/circles";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { httpServ } from "../../../ServiceWorkers";
import { unknowImg } from "../../../Shared/Constant";
import { getTime } from "../../../Untils";
import { toast } from "react-toastify";
import {
  setComponentShow,
  setShowWarning,
} from "../../../Store/RoomDetailSlice/RoomDetailSlice";
import WarningDelete from "../WarningDelete/WarningDelete";

export default function TicketsShow({
  ticketsData,
  reloadTickets,
  setReloadTickets,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.root.token);
  const user = useSelector((state) => state.root.user);
  const language = useSelector((state) => state.root.language);

  const [showDetail, setShowDetail] = useState(false);
  const [delList, setDelList] = useState({});

  const handleDelTicket = (id) => {
    setDelList({ ...delList, [id]: id });
    httpServ.huyVe(id, token).then((res) => {
      setDelList((prev) => {
        delete prev[id];
        return { ...prev };
      });
      setReloadTickets(true);
      toast.success("Hủy vé thành công!");
    });
  };

  const handleShowDelTicket = (id) => {
    dispatch(
      setComponentShow(
        <WarningDelete
          id={id}
          handleDelete={handleDelTicket}
          title="Xóa vé"
          question={"Bạn có chắc muốn xóa vé này"}
        />
      )
    );
    dispatch(setShowWarning(true));
  };

  return (
    <div className="py-5 border-t-[1px] border-b-[1px] border-gray-500">
      <h2 className="text-xl font-bold capitalize flex items-center">
        {language.bookingHistory} :{" "}
        {!reloadTickets && (
          <>
            {ticketsData.length}{" "}
            {ticketsData.length > 1 ? language.Tickets : language.Ticket}
          </>
        )}
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="px-2 py-1 flex items-center text-base rounded-md text-white bg-blue-500 ml-2 hover:opacity-75 transition-all duration-300 ease-linear"
        >
          <span>{showDetail ? language.hide : language.show}</span>
          {showDetail ? (
            <AiOutlineUp className="ml-1" />
          ) : (
            <AiOutlineDown className="ml-1" />
          )}
        </button>
      </h2>
      {reloadTickets ? (
        <div className="h-[100px] flex justify-center items-center">
          <Circles height={"3em"} width={"3em"} />
        </div>
      ) : (
        <>
          {showDetail && (
            <div className="flex flex-wrap -ml-2 -mr-2">
              {ticketsData?.map((ticket) => {
                const { _id, checkIn, checkOut, userId } = ticket;
                return (
                  <div
                    key={_id}
                    className="md:w-1/2 w-full p-2 flex items-center"
                  >
                    <div className="mr-2">
                      <img
                        src={userId?.avatar || unknowImg}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-bold text-lg">
                        {userId?.name || "..."}
                      </h5>
                      <span className="font-thin">
                        {language.SearchTakeRoom} : {getTime(checkIn)}
                      </span>
                      <span className="font-thin">
                        {language.SearchPayRoom} : {getTime(checkOut)}
                      </span>
                    </div>
                    {user?.type === "ADMIN" && (
                      <div className="ml-2">
                        {_.has(delList, _id) ? (
                          <Circles height={"2em"} width={"2em"} />
                        ) : (
                          <button
                            onClick={() => handleShowDelTicket(_id)}
                            className="px-2 py-1 rounded-md bg-red-500 text-white hover:opacity-75 transition-all duration-300 ease-linear"
                          >
                            {language.delTicket}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
