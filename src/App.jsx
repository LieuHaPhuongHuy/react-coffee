import React, { useState } from "react";
import { SignIn, SignUp, Home, Trial, Buy, Payment } from "./components/pages/";
import { Header } from "./components/layout";
import { Sidebar, Settings, Cart, Toast } from "./components/custom";
import { Route, Routes as Router } from "react-router-dom";
import { useStateContext } from "./contexts/ContextProvider";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const App = () => {
  const { activeMenu } = useStateContext();
  const [showCart, setShowCart] = useState(false);
  return (
    <div className={JSON.parse(localStorage.getItem("mode")) ? "dark" : ""}>
      <Toast />
      {/* SIDEBAR */}
      <div className="bg-orange-200 dark:bg-grey-900 min-h-screen m-0 p-0 box-border font-podkova flex transition-all duration-500 ease-linear">
        {activeMenu ? (
          <div className="w-72 h-full fixed bg-yellow-600 dark:bg-grey-900 z-30 ">
            <Sidebar />
            <Settings />
          </div>
        ) : (
          <div className="hidden z-30">
            <Sidebar />
          </div>
        )}
        {/* CART */}
        <div
          className={`fixed h-20 w-20 bg-yellow-900 dark:bg-grey-500 rounded-full bottom-3 right-3 flex justify-center items-center z-20 hover:cursor-pointer hover:opacity-80 ${
            showCart ? "mr-96" : ""
          }`}
          onClick={() => setShowCart((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBox} className="text-4xl text-orange-200" />
        </div>
        {showCart ? (
          <div className="fixed z-30 block">
            <Cart />
          </div>
        ) : (
          <div className="hidden">
            <Cart />
          </div>
        )}
        {/* BODY */}
        <div
          className={`w-full ${activeMenu ? "lg:ml-72" : ""} ${
            showCart ? "lg:mr-96" : ""
          }`}
        >
          <div className="w-full">
            <Header />
          </div>
          <div className="w-full">
            <Router>
              <Route path="/" element={<Home />}></Route>
              <Route path="/trial" element={<Trial />}></Route>
              <Route path="/purchase" element={<Buy />}></Route>
              <Route path="/payment" element={<Payment />}></Route>
              <Route path="/sign-in" element={<SignIn />}></Route>
              <Route path="/sign-up" element={<SignUp />}></Route>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
};
