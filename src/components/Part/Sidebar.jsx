import React from "react";
import { nav } from "../../data/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Menu } from "./index";
import { useStateContext } from "../../contexts/ContextProvider";
const Sidebar = () => {
  const { setActiveMenu } = useStateContext();

  return (
    <div className=" h-full pb-2 drop-shadow-xl">
      <div className="h-20 text-xl font-bold  p-3 flex items-center justify-around drop-shadow-xl">
        <div className="text-orange-200 dark:text-yellow-600">BLACK ENERGY</div>
        <div className="lg:hidden block">
          <Menu handleClick={() => setActiveMenu((prev) => !prev)} />
        </div>
      </div>
      <div className="text-orange-200 bg-slate ">
        {nav.map((item, index) => (
          <div
            className="hover:bg-orange-200 dark:hover:bg-orange-200 hover:text-yellow-900 dark:hover:text-grey-700 bg-yellow-900 dark:bg-grey-700 p-3"
            key={index}
          >
            <Link to={item.link} className="p-2 flex items-center">
              <FontAwesomeIcon icon={item.icon} className="w-10 pr-2" />
              <div className="w-full">{item.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
