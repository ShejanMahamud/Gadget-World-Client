import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google Login Clicked");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              <MdEmail className="inline-block mr-2" /> Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              <BsFillLockFill className="inline-block mr-2" /> Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          <div className="my-6 flex items-center justify-center">
            <hr className="w-1/3" />
            <span className="mx-4 text-gray-600">or</span>
            <hr className="w-1/3" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 border border-gray-300 text-gray-800 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src="https://www.gstatic.com/firebasejs/9.17.1/icons/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
