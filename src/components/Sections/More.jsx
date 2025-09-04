import React from "react";
import { info } from "../../constants/info";
import { icon } from "../../assets/images";
const More = () => {
  return (
    <div className="w-full lg:h-96 min-h-96 bg-yellow-900 dark:bg-grey-600 flex flex-col md:flex-row py-5">
      <div className="basis-1/2 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center lg:h-72 lg:w-72 h-40 w-40 rounded-full bg-orange-200 drop-shadow-xl">
          <img src={icon} alt="" className="lg:h-36 lg:w-36 h-20 w-20" />
          <div className="text-yellow-900 font-bold lg:text-xl text-md">
            BLACK ENERGY
          </div>
        </div>
      </div>
      <div className="text-orange-200 basis-1/2 lg:h-1/2 h-3/4 my-auto flex flex-col lg:flex-row gap-2 py-3">
        {info.map((item, index) => (
          <div
            className="text-center font-bold lg:odd:self-start lg:even:self-end drop-shadow-xl"
            key={index}
          >
            <div className="text-lg">{item.title}</div>
            <div className="lg:text-5xl text-2xl pt-2">{item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default More;
