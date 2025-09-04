import React, { useEffect, useRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart, setCart, formatMoney, temp, setTemp, setSum, sum } =
    useStateContext();
  const totalQuantiy = useRef();
  const totalMoney = useRef(0);
  useEffect(() => {
    if (cart.length === 0) {
      setSum(0);
    }
  }, [cart]);

  return (
    <div className="w-96 h-full fixed top-0 right-0 bg-yellow-600 dark:bg-grey-600 z-30">
      <div className="h-20 text-xl font-bold flex items-center justify-center bg-yellow-900 dark:bg-grey-900 text-orange-200 drop-shadow-xl">
        Giỏ hàng
      </div>
      <div className="">
        {cart.map((item, index) => (
          <div
            className="flex  bg-orange-200 w-4/5 mx-auto p-2 m-1 rounded-lg drop-shadow-lg justify-around items-center"
            key={index}
          >
            <div className="">
              <img src={item.image} alt="" className=" w-12 h-14" />
            </div>
            <div className="flex flex-col gap-1 text-yellow-900">
              <div className=" w-24">{item.name}</div>
              <div className="">{formatMoney(item.price * item.quantity)}</div>
            </div>
            <div className="">
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                className="w-8 text-orange-200 bg-yellow-900 text-center rounded drop-shadow-lg outline-none"
                onChange={(e) => {
                  item.quantity = e.target.value;
                  if (item.quantity < 1) {
                    cart.splice(index, 1);
                    setSum((prev) => Math.abs(prev - item.price));
                    setCart([...cart]);
                  } else {
                    totalMoney.current = 0;
                    cart.map(
                      (element) =>
                        (totalMoney.current += element.price * element.quantity)
                    );
                    setSum(totalMoney.current);
                  }
                  console.log(item.quantity);
                }}
              />
            </div>
            <div
              className="drop-shadow-lg bg-yellow-900 text-orange-200 h-8 w-8 flex justify-center items-center rounded-full"
              onClick={() => {
                cart.splice(index, 1);
                setCart([...cart]);
                setSum((prev) => prev - item.price * item.quantity);
              }}
            >
              <FontAwesomeIcon icon={faMultiply} />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 h-20 w-full bg-yellow-900 text-orange-200 flex items-center justify-around">
        <div className="">Tổng tiền: </div>
        <div className="">{formatMoney(sum)}</div>
        <div className="">
          <Link to={"/payment"}>
            <div className="bg-orange-200 px-7 py-4 rounded-lg text-yellow-900">
              Thanh toán
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
