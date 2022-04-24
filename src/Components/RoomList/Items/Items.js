import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { setHoverActive } from "../../../Store/RoomListSlice/RoomListSlice";

function Items({ currentItems }) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  const itemRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = (index) => {
    dispatch(setHoverActive(index));
  };

  const handleMouseLeave = () => {
    dispatch(setHoverActive(null));
  };

  useEffect(() => {
    // itemRef?.current?.addEventListener("mouseenter", eventHover);
    // // window.addEventListener('mouseenter')
    // return () => {
    //   itemRef.current.removeEventListener("mouseenter", eventHover);
    // };
    // console.log(itemRef);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => {
          const {
            name,
            description,
            image,
            _id,
            price,
            guests,
            bedRoom,
            bath,
          } = item;
          const newPrice = price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          });
          return (
            <div
              ref={itemRef}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave()}
              className="flex w-full items-stretch py-8"
              key={_id}
            >
              <div className=" w-[250px] rounded-md  bg-gray-400">
                <LazyLoadImage
                  height={"100%"}
                  src={image} // use normal <img> attributes as props
                  width={250}
                  effect="opacity"
                  className="rounded-md h-full  object-cover"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col justify-between">
                <div className="">
                  <h5 className="text-base font-thin mb-2">{name}</h5>
                  <p className="one__line__text">{description}</p>
                  <div className="h-[1px] w-[40px] bg-gray-300 my-3"></div>
                  <p className="flex items-center">
                    {guests} guests <span className="flex items-center">.</span>
                  </p>
                </div>
                <div className="flex justify-between mt-10">
                  <div className="">abc</div>
                  <p>
                    <span className="font-medium text-lg text-black">
                      {newPrice}
                    </span>
                    / đêm
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Items;
