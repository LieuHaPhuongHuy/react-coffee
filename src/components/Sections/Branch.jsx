import React from "react";
import { branches } from "../../data/info";
import Carousel from "react-material-ui-carousel";

const Branch = () => {
  return (
    <div className="py-2">
      <Carousel indicators={false}>
        {branches.map((item, index) => (
          <div
            className="flex md:flex-row flex-col text-orange-200 justify-center items-center gap-9"
            key={index}
          >
            <div className="w-72 text-center self-center">
              <p className="lg:text-3xl text-xl font-bold drop-shadow-xl">
                ĐỊA CHỈ
              </p>
              <div className="">{item.address}</div>
            </div>
            <img
              src={item.img}
              alt=""
              className="lg:w-96 w-64 lg:h-64 h-52 rounded-lg drop-shadow-xl"
            />
            <div className="w-72 text-center self-center">
              <p className="lg:text-3xl text-xl font-bold drop-shadow-xl">
                THỜI GIAN
              </p>
              <div className="text-xl">{item.time}</div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Branch;
