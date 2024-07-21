import React from "react";

const DiscountBanner = () => {
  return (
    <div className="h-[1.5rem] bg-[#F4F4F4] flex justify-center items-center">
      <div className="flex gap-10 text-[13px]">
        <h3 className="font-bold">{`<`}</h3>
        Get 10% off on buisness signUp
        <h3 className="font-bold">{`>`}</h3>
      </div>
    </div>
  );
};

export default DiscountBanner;
