import React, { useRef } from "react";
import { ThemeProvider, TextField } from "@mui/material";
import { useStateContext } from "../../contexts/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";

const SignUp = () => {
  const { theme, setSignIn, signIn } = useStateContext();
  const user = useRef();
  const psw = useRef();
  const confirm = useRef();
  const address = useRef();
  const mail = useRef();

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
      <div className=" text-center font-semibold text-2xl text-orange-200 mb-4">
        Đăng ký
      </div>
      <ThemeProvider theme={theme}>
        <div className="w-1/2 flex mb-3 ">
          <TextField
            label="Username"
            variant="outlined"
            className="w-full even:my-5 text-orange-200"
            sx={{ input: { color: "#E3CAA5" } }}
            inputRef={user}
          />
        </div>
        <div className="w-1/2 flex mb-3">
          <TextField
            label="Address"
            variant="outlined"
            className="w-full even:my-5 text-orange-200"
            sx={{ input: { color: "#E3CAA5" } }}
            inputRef={address}
          />
        </div>
        <div className="w-1/2 flex mb-3">
          <TextField
            label="Password"
            variant="outlined"
            className="w-full even:my-5 text-orange-200"
            sx={{ input: { color: "#E3CAA5" } }}
            inputRef={psw}
          />
        </div>
        <div className="w-1/2 flex mb-3">
          <TextField
            label="Confirm Password"
            variant="outlined"
            className="w-full even:my-5 text-orange-200"
            sx={{ input: { color: "#E3CAA5" } }}
            inputRef={confirm}
          />
        </div>
        <div className="w-1/2 flex mb-3">
          <TextField
            label="Email"
            variant="outlined"
            className="w-full even:my-5 text-orange-200"
            sx={{ input: { color: "#E3CAA5" } }}
            inputRef={mail}
          />
        </div>
      </ThemeProvider>
      <Link
        to={"/sign-in"}
        className="bg-orange-200 w-1/2 cursor-pointer flex items-center justify-center h-12 rounded-full mt-5"
      >
        <div
          onClick={() => {
            setSignIn((prev) => {
              prev.user = user.current.value;
              prev.password = psw.current.value;
              prev.address = address.current.value;
              prev.email = mail.current.value;
              localStorage.setItem("fake-user", JSON.stringify(prev));
              return prev;
            });
          }}
        >
          <div className="text-yellow-900">Đăng ký</div>
        </div>
      </Link>
    </div>
  );
};

export default SignUp;
