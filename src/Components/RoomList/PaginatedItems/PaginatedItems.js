import { memo, useEffect, useMemo, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import Items from "../Items/Items";
import "./PaginatedItems.css";

function PaginatedItems({ itemsPerPage, items, setCurrentItemsFunc }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [countItems, setCountItems] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setCurrentItemsFunc(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  useEffect(() => {
    if (itemOffset > 4) {
      setCountItems(itemOffset + 4);
    } else {
      setCountItems(itemOffset);
    }
  }, [itemOffset, pageCount]);
  console.log(currentItems);
  console.log(itemOffset);
  return (
    <>
      <div id="PaginatedItems" className=" flex flex-col justify-between">
        <div className="">
          <p className="mb-5  font-semibold">
            {items?.length && `${items?.length} chỗ ở tại khu vực trên bản đồ`}
          </p>
        </div>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel={<AiOutlineRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={<AiOutlineLeft />}
          renderOnZeroPageCount={null}
        />
        <div className="text-center mb-[20px]">
          <p>
            {itemOffset + currentItems?.length} trong số {items?.length} chỗ ở
          </p>
        </div>
      </div>
    </>
  );
}

export default memo(PaginatedItems);
