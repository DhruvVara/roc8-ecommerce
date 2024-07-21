"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { http } from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="h-[4.5rem] px-[50px] pb-2 relative flex justify-between items-end">
      <h3 className="uppercase font-bold text-[1.5rem]">ecommerce</h3>

      <ul className="flex gap-10 font-semibold">
        <li className="cursor-not-allowed">Category</li>
        <li className="cursor-not-allowed">Sale</li>
        <li className="cursor-not-allowed">Clearance</li>
        <li className="cursor-not-allowed">New Stock</li>
        <li className="cursor-not-allowed">Trendings</li>
      </ul>

      <div className=" flex gap-7">
        {/* <img src='../images/search.svg'   /> */}
        <Image src="./images/search.svg" width={32} height={50} alt="search" />

        <Image src="/images/cart.svg" width={25} height={50} alt="search" />
      </div>

      <div className="absolute top-1 right-5 flex gap-4 text-[12px]">
        <h3>Help</h3>
        <h3>Orders & Returns</h3>
        {pathname === "/" && (
          <button
            onClick={() =>
              http.delete("/logout", {}).then((res) => {
                if (!res.error) {
                  toast.success(res.data.message);
                  router.push("/login");
                }
              })
            }
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
