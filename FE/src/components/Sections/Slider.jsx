import React from "react";
import { slide } from "../../data/slide";
import Carousel from "react-material-ui-carousel";

const Slider = () => {
  return (
    <div className="pb-2 drop-shadow-lg">
      <Carousel indicators={false}>
        {slide.map((item, index) => (
          <div className="" key={index}>
            <img src={item.image} alt="" className="relative w-full z-10" />
            <div className="z-10 absolute text-sm lg:text- text-center top-1/2 left-1/2 translate-x-n1/2 translate-y-n1/2 text-orange-200 bg-yellow-900/75 p-2 rounded-md">
              {item.text}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
