import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

const Pagination = ({
  totalPage = 20,
  currentPageNo = 1,
  handlePage = () => {},
  limit = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(currentPageNo);

  const handlePages = (btn, page) => {
    if (btn === "l") {
      if (currentPage - 1 <= 1) {
        setCurrentPage(1);
        handlePage(1);
      } else {
        setCurrentPage(currentPage - 1);
        handlePage(currentPage - 1);
      }
    } else if (btn === "r") {
      if (currentPage + 1 >= totalPage) {
        setCurrentPage(totalPage);
        handlePage(totalPage);
      } else {
        setCurrentPage(currentPage + 1);
        handlePage(currentPage + 1);
      }
    } else if (btn === "dl") {
      if (currentPage - limit >= 1) {
        setCurrentPage(currentPage - limit);
        handlePage(currentPage - limit);
      }
    } else if (btn === "dr") {
      if (currentPage + limit <= totalPage) {
        setCurrentPage(currentPage + limit);
        handlePage(currentPage + limit);
      }
    }
  };

  return (
    <>
      <div
        className=" flex items-center text-[15px] gap-2"
        // style={{
        //   margin: "20px",
        //   fontSize: "30px",
        //   display: "flex",
        //   alignItems: "center",
        //   gap: "3",
        // }}
      >
        <MdOutlineKeyboardDoubleArrowLeft
          style={{
            cursor: currentPage - limit <= 0 ? "not-allowed" : "pointer",
            color: currentPage - limit <= 0 ? "grey" : "black",
          }}
          onClick={() => handlePages("dl")}
        />

        <MdOutlineKeyboardArrowLeft
          style={{
            cursor: currentPage == 1 ? "not-allowed" : "pointer",
            color: currentPage == 1 ? "grey" : "black",
          }}
          onClick={() => handlePages("l")}
        />

        <div className="flex gap-3">
          <div className="flex gap-3 flex-row-reverse ">
            {Array(Math.floor(limit / 2))
              .fill(0)
              .map((item, i) => {
                return (
                  <button
                    key={i}
                    className="text-gray-400 mx-[5px] border-0 bg-white cursor-pointer"
                  >
                    {currentPage - i - 1 < 10 && currentPage - i - 1 > 0 && 0}
                    {currentPage - i - 1 > 0 ? currentPage - i - 1 : "  "}
                  </button>
                );
              })}
          </div>

          <button className="text-black mx-[5px] border-0 bg-white cursor-pointer">
            {currentPage <= 9 && 0}
            {currentPage}
          </button>

          <div style={{ display: "flex", gap: "3" }}>
            {Array(Math.floor(limit / 2))
              .fill(0)
              .map((item, i) => {
                return (
                  <button
                    className="text-gray-400 mx-[5px] border-0 bg-white cursor-pointer"
                    key={i}
                    style={{}}
                  >
                    {currentPage + i + 1 <= 9 &&
                      currentPage + i + 1 <= totalPage &&
                      0}
                    {currentPage + i + 1 <= totalPage
                      ? currentPage + i + 1
                      : "  "}
                  </button>
                );
              })}
          </div>
        </div>

        <MdOutlineKeyboardArrowRight
          style={{
            cursor: currentPage == totalPage ? "not-allowed" : "pointer",
            color: currentPage == totalPage ? "grey" : "black",
          }}
          onClick={() => handlePages("r")}
        />
        <MdOutlineKeyboardDoubleArrowRight
          style={{
            cursor:
              currentPage >= totalPage - limit ? "not-allowed" : "pointer",
            color: currentPage >= totalPage - limit ? "grey" : "black",
          }}
          onClick={() => handlePages("dr")}
        />
      </div>
    </>
  );
};

export default Pagination;
