import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider, TextField } from "@mui/material";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const { theme, setShowToast, setStatus, setIsSignIn } = useStateContext();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Không được bỏ trống";
    }
    if (!formData.password) {
      newErrors.password = "Không được bỏ trống";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    // Logic kiểm tra email không được áp dụng ở đây vì đây là trang đăng nhập
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      const data = JSON.parse(localStorage.getItem("fake-user"));
      if (
        data &&
        formData.username === data.username &&
        formData.password === data.password
      ) {
        setIsSignIn(true);
        setShowToast(true);
        setStatus({ status: "Success", message: "Đăng nhập thành công" });
      } else {
        setShowToast(true);
        setStatus({
          status: "Warning",
          message: "Vui lòng kiểm tra lại thông tin!",
        });
      }
    }
  };

  return (
    <div className="relative mx-auto w-4/5 min-h-[24rem] bg-yellow-900 py-4 px-3 flex flex-col items-center justify-center rounded-full ">
      <Link
        to="/sign-up"
        className="absolute right-0 text-4xl h-full w-1/5 flex items-center justify-center cursor-pointer hover:bg-orange-200/30 text-yellow-600 rounded-tr-full rounded-br-full"
      >
        <div>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </div>
      </Link>
      <div className=" text-center font-semibold text-2xl text-orange-200 mb-4">
        Đăng nhập
      </div>
      <ThemeProvider theme={theme}>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 flex flex-col items-center"
        >
          <div className="w-full flex">
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              className="w-full even:my-5 text-orange-200"
              sx={{ input: { color: "#E3CAA5" } }}
              error={!!errors.username}
              helperText={errors.username}
            />
          </div>
          <div className="w-full flex my-3">
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              className="w-full even:my-5 text-orange-200"
              sx={{ input: { color: "#E3CAA5" } }}
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>
          <button
            type="submit"
            name="signIn"
            className="bg-orange-200 cursor-pointer w-full flex items-center justify-center h-12 rounded-full mt-5"
          >
            <div className="text-yellow-900">Đăng nhập</div>
          </button>
        </form>
      </ThemeProvider>
      <div className="flex justify-between w-1/2 cursor-pointer mt-3">
        <div className="text-orange-200 text-md hover:text-yellow-600">
          <Link to={"/sign-up"}>Đăng ký tài khoản</Link>
        </div>
        <div className="text-orange-200 text-md hover:text-yellow-600">
          Quên mật khẩu?
        </div>
      </div>
    </div>
  );
};

export default SignIn;
