import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

export default function ImagesShow({
  showImages,
  subImgs,
  setShowImages,
  detailImage,
}) {
  return (
    <div
      className={`fixed ${
        !showImages ? "translate-y-[100%] overflow-y-hidden" : "overflow-y-auto"
      }  top-0 right-0 left-0 bottom-0  dark:bg-gray-800 bg-white z-30 transition-all duration-300 ease-linear`}
    >
      <div className=" flex flex-col items-stretch  pt-[40px] h-full overflow-hidden">
        <div className="justify-between container lg:px-[80px] m-auto mb-10">
          <button
            onClick={() => setShowImages(false)}
            className="text-2xl p-2 border rounded-full hover:opacity-75 transition-all duration-300 ease-linear"
          >
            <AiOutlineLeft />
          </button>
        </div>
        <div
          className={`${!showImages ? "overflow-y-hidden" : "overflow-y-auto"}`}
        >
          <div className="max-w-[800px] m-auto">
            <div className="">
              <img src={detailImage} alt="" />
            </div>
            {subImgs.map((item, index) => {
              return (
                <div className="" key={index}>
                  <img src={item} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
