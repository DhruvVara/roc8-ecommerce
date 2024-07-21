"use client";

import OtpInput from "@/components/OtpInput";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const Verify = () => {
  const router = useRouter();

  const [resend, setResend] = useState(false);

  const onOtpSubmit = async (otp) => {
    http.post("/verify", { otp }).then((res) => {
      if (!res.error) {
        router.push("/");
      }
    });
  };

  function resendMail() {
    setResend(false);
    setTimeout(() => {
      setResend(true);
    }, 1000 * 60);
  }

  useEffect(() => {
    resendMail();
  }, []);

  return (
    <div className="sm:w-[45%] md:w-[40%] lg:w-[33%] xl:w-[40%] text-center border border-[#C1C1C1] rounded-xl px-[6rem] py-[2.5rem] flex flex-col gap-5">
      <h3 className="text-[2rem] font-semibold">Verify your email</h3>
      <p>
        Enter the 8 digit code you have received on
        <br />
        swa***@gmail.com
      </p>
      <div className="w-full ">
        <label className="float-left ">Code</label>
        <br />
        <div className="flex gap-3 mt-2">
          <OtpInput length={8} onOtpSubmit={onOtpSubmit} />
        </div>
      </div>
      <button
        className="uppercase bg-black w-full text-white py-3 text-[14px] rounded-md my-5"
        // disabled={`${loading ? "true" : "false"}`}
      >
        Verify
      </button>
      <div
        className={`${
          resend
            ? "text-black cursor-pointer"
            : "text-gray-400 cursor-not-allowed"
        } `}
        onClick={() => {
          resend &&
            http.get("/verify").then((res) => {
              if (!res.error) {
                toast.success(res.data.message);
                resendMail();
              }
            });
        }}
      >
        Resend code
      </div>
    </div>
  );
};

export default Verify;
