import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link, json } from "react-router-dom";
import { payments } from "../../data/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCreditCard } from "@fortawesome/free-solid-svg-icons";

const Title = ({ text }) => {
  return (
    <div className=" border-b-orange-200 border-b mt-4 text-orange-200 font-bold text-xl ">
      {text}
    </div>
  );
};

const Payment = () => {
  const { cart, formatMoney, sum } = useStateContext();
  const [info, setInfo] = useState();

  useEffect(() => {
    let data = localStorage.getItem("fake-user");
    setInfo(JSON.parse(data));
  }, []);

  if (info === undefined) {
    return <div className="">Loading...</div>;
  } else {
    return (
      <div className="bg-yellow-900 dark:bg-grey-700 mx-auto w-3/4 min-h-screen p-6">
        <p className="text-center text-orange-200 text-2xl font-bold">
          ĐƠN HÀNG
        </p>
        <Title text="Thông tin khách hàng" />
        <div className="bg-orange-200 rounded-md h-48 overflow-y-auto mt-3 text-yellow-900 text-lg p-4">
          <div className="">Họ tên khách hàng: {info.user}</div>
          <div className="">Địa chỉ: {info.address}</div>
          <div className="">Email: {info.email}</div>
        </div>
        <Title text="Sản phẩm" />
        <div className="">
          {cart.map((item, index) => (
            <div
              className="flex bg-orange-200 w-96 p-2 mt-3 rounded-lg drop-shadow-lg justify-around items-center"
              key={index}
            >
              <div className="">
                <img src={item.image} alt="" className=" w-12 h-14" />
              </div>
              <div className="text-yellow-900 font-semibold w-24">
                {item.name}
              </div>
              <div className="text-yellow-900 font-semibold">
                Số lượng: {item.quantity}
              </div>
              <div className="text-yellow-900 font-semibold">
                {formatMoney(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
        <Title text="Tổng tiền" />
        <div className="flex justify-between items-center text-orange-200 mt-3">
          <div className="">Tổng tiền: </div>
          <div className="font-semibold">{formatMoney(sum)}</div>
        </div>
        <Title text="Phương thức thanh toán" />
        <div className="flex text-yellow-900 gap-4 mt-3">
          {payments.map((item, index) => (
            <div
              className="flex bg-orange-200 rounded-lg py-1 px-3 items-center w-48 gap-4"
              key={index}
            >
              <input type="radio" name="payment" id={`p${index}`} />
              <label htmlFor={`p${index}`}>
                <div className="flex flex-col" key={index}>
                  <div className="">
                    {item.name} <FontAwesomeIcon icon={item.img} />
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <div className="bg-orange-200 text-yellow-900 rounded-lg py-2 px-4">
            <Link to="/">Quay về trang chủ</Link>
          </div>
          <div className="bg-orange-200 text-yellow-900 rounded-lg py-2 px-4">
            Thanh toán
          </div>
        </div>
      </div>
    );
  }
};

export default Payment;
