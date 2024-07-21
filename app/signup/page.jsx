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
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const fields = [
    {
      title: "Name",
      type: "text",
      value: details.name,
      required: true,
      minLength: 3,
    },
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
      minLength: 5,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    http
      .post("/signup", { ...details, email: details.email.toLowerCase() })
      .then((res) => {
        if (!res.error) {
          router.push("/verify");
          toast.success(res.data.message);
          setDetails({ email: "", password: "", name: "" });
        }
      });
  };

  return (
    <div className="w-[60%] sm:w-[48%] md:w-[40%] lg:w-[33%] xl:w-[27%] border border-[#C1C1C1] rounded-xl flex flex-col gap-6 items-center px-7">
      {/* Title */}
      <h3 className="text-[1.5rem] mt-5 font-bold">Create your account</h3>

      {/* input */}
      <form className="flex flex-col gap-5 w-5/6" onSubmit={handleSubmit}>
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
          create account
        </button>
      </form>

      <p className="text-[13px] text-[#333333] pb-10">
        Have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default page;
