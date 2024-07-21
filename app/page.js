"use client";

import { useEffect, useState } from "react";
import { http } from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [page, setPage] = useState({
    pageCount: 1,
    totalPage: 0,
  });

  const [categories, setCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const fetchSelectedCategories = async () => {
    http.get("/selectedCategories").then((res) => {
      setSelectedCategories(res.data.data ? res.data.data : []);
    });
  };

  useEffect(() => {
    fetchSelectedCategories();
  }, []);

  const fetchCategoriesList = async () => {
    http.get(`/category?page=${page.pageCount}`).then((res) => {
      setCategories(res.data.data.category);
      setPage({ ...page, totalPage: res.data.data.totalPage });
    });
  };

  useEffect(() => {
    fetchCategoriesList();
  }, [page.pageCount]);

  const handlePage = (page) => {
    setPage({ ...page, pageCount: page });
  };

  const handleCheckboxChange = async (e, item) => {
    let newSelectedCategories = selectedCategories;

    if (e.target.checked) {
      newSelectedCategories = [...selectedCategories, item];

      setSelectedCategories(newSelectedCategories);
    } else {
      newSelectedCategories = newSelectedCategories.filter(
        (ele) => ele.id != item.id
      );
      setSelectedCategories(newSelectedCategories);
    }


    http
      .put("/category", { selectedCategories: newSelectedCategories })
      .then((res) => {
        if (res.error) {
          toast.error(res.data.message);
        }
      });
  };

  return (
    <div className="w-[60%] sm:w-[48%] md:w-[40%] lg:w-[33%] xl:w-[27%] py-8 border border-[#C1C1C1] rounded-xl flex flex-col gap-5 items-center px-[3rem]">
      <h3 className="text-[1.3rem] font-bold">Please mark your interests!</h3>

      <p>We will keep you notified</p>

      <div className="w-full flex flex-col gap-3">
        <h4 className="float-left font-semibold">My saved interest!</h4>
        <div className=" flex flex-col gap-1">
          {categories.map((item, i) => {
            return (
              <div className="h-7  flex items-center" key={item.id}>
                <input
                  type="checkbox"
                  value={item}
                  onClick={(e) => handleCheckboxChange(e, item)}
                  className="h-[20px] w-[20px] accent-black bg-gray-400"
                  checked={selectedCategories?.some((ele) => ele.id == item.id)}
                />
                <label className="ml-3">{item.name}</label>
              </div>
            );
          })}

          <div className="my-3">
            <Pagination
              totalPage={page.totalPage}
              currentPageNo={page.pageCount}
              handlePage={handlePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

