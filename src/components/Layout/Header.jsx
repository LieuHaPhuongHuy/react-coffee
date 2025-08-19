import React from "react";
import { Menu, User } from "../Part";
import { useStateContext } from "../../contexts/ContextProvider";
import { icon } from "../../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { setActiveMenu } = useStateContext();

  return (
    <div className="h-20 w-full flex justify-between items-center shadow-xl ">
      <Menu handleClick={() => setActiveMenu((prev) => !prev)} />
      <div className="icon flex flex-col items-center drop-shadow-xl">
        <img src={icon} alt="" className="h-10 w-10" />
        <div className="text-yellow-900 dark:text-yellow-600 font-bold text-sm">
          BLACK ENERGY
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center justify-center">
          <FontAwesomeIcon
            icon={faBell}
            className="text-yellow-900 dark:text-orange-200 text-2xl p-3 mr-10 hover:text-yellow-600 cursor-pointer drop-shadow-xl"
          />
        </div>
        <User />
      </div>
    </div>
  );
};

export default Header;
