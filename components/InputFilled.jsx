"use client";

import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const InputFilled = ({
  title = "Title",
  type = "",
  value = "",
  handleChange = () => {},
  name = "",
  placeholder,
  required = false,
  minLength = "",
  maxLength = "",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  return (
    <div className="relative pt-3">
      <label
        htmlFor={name ? name : title.toLowerCase()}
        className="absolute top-[-12px] text-[1rem] text-gray-500"
      >
        {title}
      </label>

      <div className="w-full px-2 py-[1px] flex items-center border border-gray-500 rounded-[4px]">
        <input
          type={
            type == "password"
              ? isPasswordVisible
                ? "password"
                : "text"
              : type
          }
          name={name ? name : title.toLowerCase()}
          className=" outline-none py-1 px-2 text-[0.9rem] w-full rounded-[4px]"
          placeholder={placeholder ? placeholder : title}
          value={value}
          onChange={(e) => handleChange(e)}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
        />

        {type == "password" && (
          <div
            className=" text-[0.8rem] py-[2px] text-gray-600 cursor-pointer underline"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? "Show" : "Hide"}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFilled;
