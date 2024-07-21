"use client";

import Link from "next/link";
import React, { useState } from "react";
import InputFilled from "@/components/InputFilled";
import { http } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    http
      .post("/login", { ...details, email: details.email.toLowerCase() })
      .then((res) => {
        console.log(res)
        if (!res.data.data.verified) {
          router.push("/verify");
        } else {
          router.push("/");
        }
        toast.success(res.data.message);
        setDetails({ email: "", password: "" });
      });

    setDetails({ email: "", password: "" });
  };

  const fields = [
    {
      title: "Email",
      type: "email",
      value: details.email,
      required: true,
    },
    {
      title: "Password",
      type: "password",
      value: details.password,
      required: true,
      minLength:5
    },
  ];

  return (
    <div className=" w-[60%] sm:w-[48%] md:w-[40%] lg:w-[33%] xl:w-[27%] border border-[#C1C1C1] rounded-xl flex flex-col gap-6 items-center px-7">
      {/* Title */}
      <h3 className="text-[1.5rem] mt-5 font-bold">Login</h3>

      <div className="text-center flex flex-col gap-1">
        <p className="text-[1.2rem] font-semibold">Welcome back to ecommerce</p>

        <p className="text-[0.8rem]">The next gen buissness marketplace</p>
      </div>

      {/* input */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-5/6 border-b-2 border-[#C1C1C1] pb-5"
      >
        {fields.map((item) => {
          return (
            <InputFilled
              key={item.title}
              {...item}
              handleChange={handleChange}
            />
          );
        })}

        <button
          type="submit"
          className="uppercase bg-black w-full text-white py-2 text-[14px] rounded-md mt-2"
        >
          login
        </button>
      </form>

      <p className="text-[13px] text-[#333333] pb-10">
        Don't have an Account?{" "}
        <Link href="/signup" className="uppercase">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default page;
