import React from "react";
import { Switch } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useStateContext } from "../../contexts/ContextProvider";

const Settings = () => {
  const { setDarkMode, theme } = useStateContext();

  return (
    <div className="w-full h-10 absolute bottom-0 bg-yellow-600 outline-orange-200 dark:bg-grey-900 outline outline-2 text-orange-200 flex items-center justify-around drop-shadow-2xl">
      <div className="text-lg font-bold">Chế độ màn hình</div>
      <div className="drop-shadow-xl">
        <ThemeProvider theme={theme}>
          <Switch
            checked={JSON.parse(localStorage.getItem("mode")) && "checked"}
            onChange={() => {
              setDarkMode((prev) => {
                localStorage.removeItem("mode");
                localStorage.setItem("mode", !prev);
                return !prev;
              });
            }}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Settings;
