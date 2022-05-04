import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { httpServ } from "../../ServiceWorkers";
import { setShowSearch } from "../../Store/HeaderSlice/HeaderSlice";
import { BsColumnsGap } from "react-icons/bs";
import ImagesShow from "../../Components/PageRoomDetail/ImagesShow/ImagesShow";
import InfoShow from "../../Components/PageRoomDetail/InfoShow/InfoShow";
import BookTicket from "../../Components/PageRoomDetail/BookTicket/BookTicket";

export default function RoomDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [subImgs, setSubImgs] = useState([
    "https://firebasestorage.googleapis.com/v0/b/airbnb-4989d.appspot.com/o/img1.webp?alt=media&token=b22c6a2f-f439-46ee-a361-1c13254698a1",
    "https://firebasestorage.googleapis.com/v0/b/airbnb-4989d.appspot.com/o/img2.webp?alt=media&token=150c93a8-ba6a-4a82-910f-ea5f194d7c1e",
    "https://firebasestorage.googleapis.com/v0/b/airbnb-4989d.appspot.com/o/img3.webp?alt=media&token=b7637afe-afe4-42c5-a8a9-d3dd6177a8d8",
    "https://firebasestorage.googleapis.com/v0/b/airbnb-4989d.appspot.com/o/img6.webp?alt=media&token=c3afea08-c868-4d2c-be09-c4d1e13f4ab4",
    "https://firebasestorage.googleapis.com/v0/b/airbnb-4989d.appspot.com/o/img4.webp?alt=media&token=2fe03f04-c49e-4046-a5c5-9550ba432c01",
    "https://firebasestorage.googleapis.com/v0/b/airbnb-4989d.appspot.com/o/img5.webp?alt=media&token=43ae2500-9187-4da4-853a-b9344a352208",
    "https://firebasestorage.googleapis.com/v0/b/airbnb-4989d.appspot.com/o/img6.webp?alt=media&token=c3afea08-c868-4d2c-be09-c4d1e13f4ab4",
  ]);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    httpServ.layThongTinChiTietPhong(id).then((res) => {
      setDetailData(res.data);
    });
  }, [id]);

  useEffect(() => {
    dispatch(setShowSearch(false));
  }, []);

  const { name, guests, bedRoom, bath, description } = detailData;
  console.log(detailData);
  return (
    <div className="pt-[96px] container mx-auto relative">
      {!showImages && (
        <div className="py-5">
          <div className="">
            <h2 className="capitalize font-bold text-3xl">{name}</h2>
          </div>
          <div className="mt-5 relative flex lg:max-h-[500px] items-stretch rounded-[40px] overflow-hidden -ml-1 -mr-1">
            <div className="w-1/2">
              <div className="h-full p-1">
                <div className="h-full relative group cursor-pointer overflow-hidden">
                  <LazyLoadImage
                    src={detailData.image}
                    width={"100%"}
                    className="w-full object-cover"
                    alt=""
                    effect="opacity"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 group-hover:bg-black/[0.2] transition-all duration-300 ease-linear "></div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex h-full flex-wrap ">
                {subImgs.slice(0, 4).map((item, index) => {
                  return (
                    <div key={index} className="w-1/2 h-1/2 p-1 ">
                      <div className="relative h-full cursor-pointer group">
                        <img
                          src={item}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 group-hover:bg-black/[0.2] transition-all duration-300 ease-linear "></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-5 right-5">
              <button
                onClick={() => setShowImages(true)}
                className="flex items-center rounded-lg border border-black hover:bg-gray-200 bg-white text-black px-2 py-1"
              >
                <BsColumnsGap />
                <span className="ml-1">Hien thi tat ca anh</span>
              </button>
            </div>
          </div>
          <div className="flex mt-10 items-stretch">
            <div className="lg:w-4/6 lg:pr-20">
              <InfoShow detailData={detailData} />
            </div>
            <div className="lg:w-2/6">
              <BookTicket />
            </div>
          </div>
        </div>
      )}

      <ImagesShow
        showImages={showImages}
        subImgs={subImgs}
        setShowImages={setShowImages}
        detailImage={detailData?.image}
      />
    </div>
  );
}
