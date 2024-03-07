import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faBox } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Trial = () => {
  return (
    <div className="w-full lg:h-96 h-auto lg:my-0 my-24 flex lg:flex-row flex-col justify-center items-center lg:gap-48 gap-10 text-yellow-900 font-bold lg:text-3xl text-xl">
      <div className="text-orange-200 bg-yellow-900 dark:bg-yellow-600 dark:hover:bg-orange-200 rounded-lg p-4 hover:bg-orange-200 hover:text-yellow-600 drop-shadow-xl">
        <Link to="/trial">
          <span className="mr-4">Dùng thử</span>
          <FontAwesomeIcon icon={faCoffee} />
        </Link>
      </div>
      <div className="drop-shadow-xl dark:text-yellow-600">
        TRẢI NGHIỆM NGAY
      </div>
      <div className="text-orange-200 bg-yellow-900 dark:bg-yellow-600 dark:hover:bg-orange-200 rounded-lg p-4 hover:bg-orange-200 hover:text-yellow-600 drop-shadow-xl">
        <Link to="/purchase">
          <FontAwesomeIcon icon={faBox} />
          <span className="ml-4">Đặt hàng</span>
        </Link>
      </div>
    </div>
  );
};

export default Trial;
