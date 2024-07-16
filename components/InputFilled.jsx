"use client";

import React, { useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

const InputFilled = ({
  title = "Title",
  type = "",
  value = "",
  handleChange = () => {},
  name = "",
  placeholder,
  required = false,
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
        />

        {type == "password" && (
          <div
            className=" text-[1.2rem] py-[2px] text-gray-600 cursor-pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {!isPasswordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFilled;
