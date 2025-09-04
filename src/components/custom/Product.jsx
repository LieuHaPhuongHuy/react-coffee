import React from "react";
import { products } from "../../constants/info";

const Product = () => {
  return (
    <div className="flex justify-center lg:gap-36 gap-10 py-12 min-h-96">
      {products.map((item, index) => (
        <div
          className="flex flex-col items-center w-60 text-yellow-900 flex-wrap dark:text-orange-200 font-bold"
          key={index}
        >
          <img src={item.image} alt="" className="drop-shadow-xl" />
          <p className="text-sm pt-3 text-center drop-shadow-xl">{item.name}</p>
          <p className="lg:text-3xl text-lg pt-1 text-center drop-shadow-xl">
            {item.price} đ
          </p>
        </div>
      ))}
    </div>
  );
};

export default Product;
