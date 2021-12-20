import React, { useState } from "react";
import PropTypes from "prop-types";
import { signInHandler } from "../../firebase/functions/AuthActions";
import SnackbarComponent from "../common/SnackbarComponent";

export interface signInProps {
  setActiveView: any;
}

const SignIn: React.FC<signInProps> = ({ setActiveView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const clickHandler = async () => {
    const res = await signInHandler(email, password);
    console.log(res);
    if (res.success) {
      setMessage("Sign In Successful");
      setColor("#1A202C");
      setSnackbar(true);
      window.location.reload();
    } else {
      setMessage(res.error);
      setColor("#600709");
      setSnackbar(true);
    }
  };

  return (
    <div className="w-full">
      <SnackbarComponent
        message={message}
        color={color}
        setOpen={snackbar}
        setSnackbarOpen={setSnackbar}
      />
      <form className="pt-6 pb-8 mb-4">
        <h1 className="font-bold text-white text-3xl">Hi, Welcome Back!</h1>
        <p className="text-sm text-gray-500 text-opacity-60	">
          Best browser productivity dashboard!
        </p>
        <br />
        <div className="mb-4">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="Email">
            Email
          </label>
          <input
            className="bg-gray-800 border-gray-800 shadow appearance-none border w-full p-3  mb-3 rounded-lg focus:outline-none focus:shadow-outline"
            id="Email"
            type="text"
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className="bg-gray-800 border-gray-800 shadow appearance-none border w-full p-3 mb-3 rounded-lg focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="******************"
          />
          <div className="flex justify-end">
            <a
              className="inline-block align-baseline font-bold text-gray-400 text-sm text-opacity-50"
              href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <br />
        <div className="flex flex-col">
          <button
            className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={clickHandler}>
            Sign In
          </button>
          <p className="text-center text-gray-500 text-xs mt-4">
            <div onClick={() => setActiveView("signup")}>
              Not registered yet?{" "}
              <a className="text-indigo-500 font-bold">Create a account here</a>
            </div>
          </p>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Dashlit. All rights reserved.
      </p>
    </div>
  );
};

export default SignIn;

SignIn.propTypes = {
  setActiveView: PropTypes.string.isRequired
};
