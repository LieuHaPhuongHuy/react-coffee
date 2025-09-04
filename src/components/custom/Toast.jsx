import React, { useEffect } from "react";
import { contextToast } from "../../constants/info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faWarning,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../../contexts/ContextProvider";

const statusList = [
  { status: "Success", icon: faCheck },
  { status: "Warning", icon: faWarning },
  { status: "Error", icon: faCircleXmark },
];

const Toast = () => {
  const { showToast, setShowToast, status } = useStateContext();

  useEffect(() => {
    const time = setTimeout(() => {
      setShowToast(false);
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, [showToast]);

  return (
    <div
      onClick={() => setShowToast(false)}
      className={`z-50 fixed top-4 right-5 bg-orange-200 min-w-[20rem] h-16 cursor-pointer rounded-full transition duration-300 ease-linear ${
        showToast ? "visible" : "invisible "
      }`}
    >
      {statusList
        .filter((list) => list.status === status.status)
        .map((item, index) => {
          return (
            <div
              className="flex h-full w-full items-center justify-around "
              key={index}
            >
              <div className="basis-1/3 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="p-2 bg-yellow-900 text-orange-200 rounded-full"
                />
              </div>
              <div className="basis-2/3 flex flex-col justify-around">
                <div className="text-lg font-semibold text-yellow-900">
                  {item.status}
                </div>
                <div className="text-yellow-900 text-sm">{status.message}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Toast;
