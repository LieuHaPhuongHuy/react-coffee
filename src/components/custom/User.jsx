import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAddressCard,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../contexts/ContextProvider";
const User = () => {
  const { isSignIn, setIsSignIn } = useStateContext();
  const [active, setActive] = useState(false);

  return (
    <div className="relative">
      <div className="" onClick={() => setActive((prev) => !prev)}>
        <FontAwesomeIcon
          icon={faUser}
          className="text-yellow-900 dark:text-orange-200 text-2xl p-3 mr-10 rounded-full hover:bg-yellow-900 dark:hover:bg-yellow-600 hover:text-orange-200 hover:cursor-pointer drop-shadow-xl"
        />
      </div>
      <div
        className={`absolute top-full min-w-max bg-yellow-900 dark:bg-grey-700 z-20 px-3 py-2 right-1/2 rounded-lg ${
          active ? "block" : "hidden"
        }`}
      >
        {isSignIn ? (
          <>
            <Link to={"/sign-in"}>
              <div className="px-3 py-2 text-orange-200 hover:bg-yellow-600 rounded-lg font-medium drop-shadow-lg  even:my-2">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faUser} />
                </span>{" "}
                Thông tin khách hàng
              </div>
            </Link>
            <div
              onClick={() => {
                localStorage.removeItem("fake-user");
                setIsSignIn(false);
              }}
              className="px-3 py-2 text-orange-200 cursor-pointer hover:bg-yellow-600 rounded-lg font-medium drop-shadow-lg  even:my-2"
            >
              <span className="mr-2">
                <FontAwesomeIcon icon={faDoorOpen} />
              </span>{" "}
              Đăng xuất
            </div>
          </>
        ) : (
          <>
            <Link to={"/sign-in"}>
              <div className="px-3 py-2 text-orange-200 hover:bg-yellow-600 rounded-lg font-medium drop-shadow-lg  even:my-2">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faUser} />
                </span>{" "}
                Đăng nhập
              </div>
            </Link>
            <Link to={"/sign-up"}>
              <div className="px-3 py-2 text-orange-200 hover:bg-yellow-600 rounded-lg font-medium drop-shadow-lg  even:my-2">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faAddressCard} />
                </span>{" "}
                Đăng ký
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
