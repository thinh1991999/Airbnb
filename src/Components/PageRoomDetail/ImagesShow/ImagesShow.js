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
      <div className="pt-[40px] h-full ">
        <div className=" flex flex-col items-stretch overflow-hidden h-full">
          <div className="container lg:px-[80px] md:px-[20px] px-[10px] m-auto mb-10">
            <button
              onClick={() => setShowImages(false)}
              className="text-2xl p-2 border rounded-full hover:opacity-75 transition-all duration-300 ease-linear"
            >
              <AiOutlineLeft />
            </button>
          </div>
          <div
            className={`${
              !showImages ? "overflow-y-hidden" : "overflow-y-auto"
            } w-full flex-1`}
          >
            <div className="md:px-0 px-[10px] max-w-[800px] m-auto flex flex-wrap">
              <div className="md:w-1/2 p-2 w-full">
                <div className="py-2">
                  <img src={detailImage} alt="" className="w-full rounded-xl" />
                </div>
                {subImgs.map((item, index) => {
                  return (
                    <div className="py-2 " key={index}>
                      <img src={item} alt="" className="w-full rounded-xl" />
                    </div>
                  );
                })}
              </div>
              <div className="md:w-1/2 p-2 hidden">
                <div className="py-2">
                  <img src={detailImage} alt="" className="w-full rounded-xl" />
                </div>
                {subImgs.map((item, index) => {
                  return (
                    <div className="py-2 " key={index}>
                      <img src={item} alt="" className="w-full rounded-xl" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
