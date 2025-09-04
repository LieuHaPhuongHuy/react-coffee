import React, { useState } from "react";
import { ThemeProvider, TextField } from "@mui/material";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { theme } = useStateContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username không được bỏ trống";
    }
    if (!formData.email) {
      newErrors.email = "Email không được bỏ trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Định dạng email không hợp lệ";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được bỏ trống";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    if (formData.email === "existing@example.com") {
      newErrors.email = "Email đã được sử dụng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      localStorage.setItem("fake-user", JSON.stringify(formData));
      console.log("Đăng ký thành công!", formData);
    }
  };

  return (
    <div className="relative mt-10 mx-auto w-4/5 min-h-[24rem] bg-yellow-900 py-4 px-3 flex flex-col items-center justify-center rounded-full overflow-x-hidden ">
      <Link
        to="/sign-in"
        className="absolute left-0 text-4xl h-full w-1/5 flex items-center justify-center cursor-pointer hover:bg-orange-200/30 text-yellow-600 rounded-tl-full rounded-bl-full"
      >
        <div>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </div>
      </Link>
      <div className="text-center font-semibold text-2xl text-orange-200 mb-4">
        Đăng ký
      </div>
      <ThemeProvider theme={theme}>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 flex flex-col items-center"
        >
          <div className="w-full flex mb-3">
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
          <div className="w-full flex mb-3">
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              className="w-full even:my-5 text-orange-200"
              sx={{ input: { color: "#E3CAA5" } }}
            />
          </div>
          <div className="w-full flex mb-3">
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
          <div className="w-full flex mb-3">
            <TextField
              label="Confirm Pass"
              name="confirmPassword" // Đã sửa lỗi: Tên khớp với formData
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              className="w-full even:my-5 text-orange-200"
              sx={{ input: { color: "#E3CAA5" } }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </div>
          <div className="w-full flex mb-3">
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              className="w-full even:my-5 text-orange-200"
              sx={{ input: { color: "#E3CAA5" } }}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <button
            type="submit"
            name="signUp"
            className="bg-orange-200 w-full cursor-pointer flex items-center justify-center h-12 rounded-full mt-5"
          >
            <div className="text-yellow-900">Đăng ký</div>
          </button>
        </form>
      </ThemeProvider>
    </div>
  );
};

export default SignUp;
