import React from "react";
import { Slider, About, More, Branch, Trial } from "../Sections";
import { Product } from "../Part";
const Home = () => {
  return (
    <div className="">
      <Slider />
      <About />
      <More />
      <div className="min-h-96">
        <p
          className="text-center py-10 text-2xl font-bold text-yellow-900
                 dark:text-orange-200 drop-shadow-xl"
        >
          SẢN PHẨM
        </p>
        <Product />
      </div>
      <div className="min-h-96 bg-yellow-900 dark:bg-grey-700 py-4">
        <p className="text-center lg:py-10 text-2xl font-bold text-orange-200 drop-shadow-xl">
          CHI NHÁNH
        </p>
        <Branch />
      </div>
      <Trial />
    </div>
  );
};

export default Home;
