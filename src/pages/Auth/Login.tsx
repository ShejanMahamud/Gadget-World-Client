import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { googleLogin, emailPasswordLogin } = useAuth();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Successfully Logged In!");
      setTimeout(() => {
        navigate(location?.state || "/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      await toast.promise(emailPasswordLogin(email, password), {
        loading: "Authenticating Your Credentials...",
        success: "Successfully Logged In!",
        error: "Failed To Authenticate",
      });
      navigate("/");
      return;
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center uppercase text-primary">
          Login
        </h2>
        <form onSubmit={handleLogin}>
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
          <h1 className="text-center mt-2 text-sm">
            Not Registered?{" "}
            <span
              onClick={() => navigate("/register")}
              className="hover:underline decoration-primary underline-offset-4 text-primary"
            >
              Register Here
            </span>
          </h1>
          <div className="my-6 flex items-center justify-center">
            <hr className="w-1/3 border border-gray-200" />
            <span className="mx-4 text-gray-600">or</span>
            <hr className="w-1/3 border border-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 border border-gray-300 text-gray-800 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
