import React from "react";
import { products } from "../../data/info";
import { useStateContext } from "../../contexts/ContextProvider";
const Buy = () => {
  const { formatMoney, setCart, cart, setTrial, setSum, sum, trial } =
    useStateContext();
  return (
    <div className="min-h-screen bg-yellow-900 dark:bg-grey-700 w-3/4 mx-auto">
      <div className="text-center text-orange-200 text-5xl pt-10 font-bold">
        Sản phẩm
      </div>
      <div className="flex gap-3 flex-wrap px-14 py-16">
        {products.map((item, index) => (
          <div
            className="flex flex-col items-center bg-orange-200 px-5 py-3 gap-2 text-yellow-900 rounded-lg "
            key={index}
          >
            <div className="font-semibold">{item.name}</div>
            <div className="drop-shadow-lg">
              <img src={item.image} alt="" />
            </div>
            <div className=" font-semibold">{formatMoney(item.price)}</div>
            <div
              className="bg-yellow-900 text-orange-200 px-3 py-2 rounded-lg hover:cursor-pointer hover:opacity-80"
              onClick={(e) => {
                if (!cart.includes(item)) {
                  item.quantity = 1;
                  setCart((prev) => [...prev, item]);
                  setSum(sum + item.quantity * item.price);
                }
              }}
            >
              {" "}
              Đặt hàng
            </div>
            <div
              className="bg-yellow-600 text-yellow-900 px-3 py-2 rounded-lg hover:cursor-pointer hover:opacity-80"
              onClick={() => {
                if (!trial.includes(item)) setTrial((prev) => [...prev, item]);
              }}
            >
              Trải nghiệm
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
