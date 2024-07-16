"use client";

import { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 6, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inpRef = useRef([]);

  useEffect(() => {
    if (inpRef.current[0]) {
      inpRef.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    // submit trigger
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inpRef.current[index + 1]) {
      inpRef.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inpRef.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inpRef.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inpRef.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inpRef.current[index - 1].focus();
    }
  };

  return (
    <>
      {otp.map((val, i) => {
        return (
          <input
            type="text"
            key={i}
            className="border border-[#C1C1C1] h-[45px] w-[45px] rounded-md text-center text-black"
            ref={(input) => (inpRef.current[i] = input)}
            value={val}
            onChange={(e) => handleChange(i, e)}
            onClick={() => handleClick(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        );
      })}
    </>
  );
};

export default OtpInput;
