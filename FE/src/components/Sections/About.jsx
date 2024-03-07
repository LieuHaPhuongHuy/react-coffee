import React from "react";
import { about } from "../../assets/images";
const About = () => {
  return (
    <div className="lg:h-96 h-auto py-6 lg:py-0 w-3/4 mb-1 mx-auto bg-yellow-600/30 dark:bg-grey-700/30 flex lg:flex-row flex-col items-center rounded-lg ">
      <div className="basis-1/2 flex justify-center lg:mb-0 mb-3">
        <div className=" rounded-full bg-yellow-600 lg:h-72 lg:w-72 w-60 h-60 flex justify-center items-center">
          <img
            src={about}
            alt=""
            className=" h-56 lg:h-64 drop-shadow-xl rounded-full"
          />
        </div>
      </div>
      <div className="text-yellow-900 dark:text-orange-200 font-medium max-w-md lg:text-xl text-sm px-4 basis-1/2 text-justify lg:text-left ">
        <p>Được thành lập vào năm 2010</p>
        <p className="py-3">Bởi ông Robert J.Smith</p>
        <p>
          Black Energy được ông thực hiện với niềm đam mê với hương vị đậm đà
          của cà phê Việt và ông muốn lan tỏa hương vị này ra khắp thế giới để
          thỏa mãn những người yêu thích cà phê như ông.
        </p>
      </div>
    </div>
  );
};

export default About;
