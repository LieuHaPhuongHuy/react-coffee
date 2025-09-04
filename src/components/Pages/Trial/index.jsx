// import React from "react";
import { TextField, ThemeProvider } from "@mui/material";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
// import { Toast } from "../custom";
const Trial = () => {
  const { theme, trial, setTrial, formatMoney, setShowToast } =
    useStateContext();
  return (
    <div className="">
      <div className="text-center font-bold text-3xl text-yellow-900 dark:text-orange-200 py-5">
        TRẢI NGHIỆM THỬ
      </div>
      <div className="bg-yellow-900 dark:bg-grey-700 w-4/5 mx-auto min-h-screen px-4 py-6 rounded-lg relative">
        <ThemeProvider theme={theme}>
          <TextField
            label="Họ và tên"
            variant="outlined"
            className="w-full even:my-5 text-orange-200"
            sx={{ input: { color: "#E3CAA5" } }}
          />
          <TextField
            label="Địa chỉ"
            variant="outlined"
            className="w-full even:my-5"
            sx={{ input: { color: "#E3CAA5" } }}
          />
          <TextField
            label="Số điện thoại"
            variant="outlined"
            className="w-full even:my-5"
            sx={{ input: { color: "#E3CAA5" } }}
          />
          <TextField
            label="Email"
            variant="outlined"
            className="w-full even:my-5"
            sx={{ input: { color: "#E3CAA5" } }}
          />
        </ThemeProvider>
        <p className="pb-2 text-orange-200 italic">
          Các sản phẩm bạn trải nghiệm sẽ được giảm 30% với số lượng giới hạn
        </p>
        <div className="flex flex-wrap justify-center">
          {trial.map((item, index) => (
            <div
              className="flex bg-orange-200 w-1/3 p-2 m-1 rounded-lg drop-shadow-lg justify-around items-center"
              key={index}
            >
              <div className="">
                <img src={item.image} alt="" className=" w-12 h-14" />
              </div>
              <div className="flex flex-col gap-1 text-yellow-900">
                <div className="w-24">{item.name}</div>
                <div className="">{formatMoney(item.price * 0.7)}</div>
              </div>
              <div
                className=" bg-yellow-900 text-orange-200 h-8 w-8 flex justify-center items-center rounded-full"
                onClick={() => {
                  trial.splice(index, 1);
                  setTrial([...trial]);
                }}
              >
                <FontAwesomeIcon icon={faMultiply} />
              </div>
            </div>
          ))}
        </div>
        <div
          className="bg-orange-200 text-yellow-900 font-bold text-2xl text-center py-4 rounded-lg absolute
                bottom-2 w-3/4 translate-x-n1/2 left-1/2 cursor-pointer"
          onClick={() =>
            setShowToast((prev) => {
              console.log(!prev);
              return !prev;
            })
          }
        >
          Xác nhận
        </div>
      </div>
    </div>
  );
};

export default Trial;
