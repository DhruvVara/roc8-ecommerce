import React from "react";

const DiscountBanner = () => {
  return (
    <div className="h-[5dvh] xl:h-[4dvh] bg-[#F4F4F4] flex justify-center items-center">
      <p className="flex gap-10 text-[13px]">
        <h3 className="font-bold">{`<`}</h3>
        Get 10% off on buisness signUp
        <h3 className="font-bold">{`>`}</h3>
      </p>
    </div>
  );
};

export default DiscountBanner;
