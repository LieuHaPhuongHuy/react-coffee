import { createContext, useState, useContext, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
const StateProvider = createContext();

export const ContextProvider = ({ children }) => {
     const [activeMenu, setActiveMenu] = useState(false);
     const [darkMode, setDarkMode] = useState(
          JSON.parse(localStorage.getItem("mode"))
     );
     const [temp, setTemp] = useState(1);
     const [sum, setSum] = useState(0);
     const [cart, setCart] = useState([]);
     const [trial, setTrial] = useState([]);

     const [isSignIn, setIsSignIn] = useState(false);
     const [showToast, setShowToast] = useState(false);
     const [status, setStatus] = useState({ status: "", message: "" });

     const theme = createTheme({
          components: {
               MuiSwitch: {
                    styleOverrides: {
                         switchBase: {
                              // Controls default (unchecked) color for the thumb
                              color: "#E3CAA5",
                         },
                         colorPrimary: {
                              "&.Mui-checked": {
                                   // Controls checked color for the thumb
                                   color: "#876445",
                              },
                         },
                         track: {
                              // Controls default (unchecked) color for the track
                              opacity: 0.2,
                              backgroundColor: "#E3CAA5",
                              ".Mui-checked.Mui-checked + &": {
                                   // Controls checked color for the track
                                   opacity: 0.7,
                                   backgroundColor: "#876445",
                              },
                         },
                    },
               },
               MuiTextField: {
                    styleOverrides: {
                         root: {
                              "&": {
                                   caretColor: "#E3CAA5",
                              },
                              "& label": {
                                   color: "#E3CAA5",
                              },
                              "& label.Mui-focused": {
                                   color: "#E3CAA5",
                              },
                              "& .MuiOutlinedInput-root": {
                                   "& fieldset": {
                                        borderColor: "#E3CAA5",
                                   },
                                   "&:hover fieldset": {
                                        borderColor: "#CA965C",
                                   },
                                   "&.Mui-focused fieldset": {
                                        borderColor: "#E3CAA5",
                                   },
                              },
                         },
                    },
               },
          },
     });

     useEffect(() => {
          if (localStorage.getItem("mode") === null) {
               localStorage.setItem("mode", "false");
          }
     }, []);

     function formatMoney(value) {
          return new Intl.NumberFormat("vi-VN", {
               style: "currency",
               currency: "VND",
          }).format(value);
     }

     return (
          <StateProvider.Provider
               value={{
                    activeMenu,
                    setActiveMenu,
                    darkMode,
                    setDarkMode,
                    cart,
                    setCart,
                    trial,
                    setTrial,
                    temp,
                    setTemp,
                    sum,
                    setSum,
                    formatMoney,
                    theme,
                    showToast,
                    setShowToast,
                    status,
                    setStatus,
                    isSignIn,
                    setIsSignIn,
               }}
          >
               {children}
          </StateProvider.Provider>
     );
};

export const useStateContext = () => useContext(StateProvider);
