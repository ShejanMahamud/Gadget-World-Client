import { sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFillLockFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../config/firebase.config";
import useAuth from "../../hooks/useAuth";

const Register: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { emailPasswordRegister } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailPassRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;
    const terms = (form.elements.namedItem("terms") as HTMLInputElement)
      .checked;
    // const phone_number = (form.elements.namedItem("phone") as HTMLInputElement).value;

    if (!terms) {
      return toast.error("Please Accept Terms & Services!");
    }
    if (password !== confirmPassword) {
      return toast.error("Password & Confirm Password Should Be Same!");
    }
    if (!usernameRegex.test(username)) {
      return toast.error("Username Not Available!");
    }
    if (!passwordRegex.test(password)) {
      return toast.error("Password Must Be Strong!");
    }

    try {
      await emailPasswordRegister(email, password);
      await updateProfile(auth.currentUser!, {
        displayName: name,
        // Add the photoURL only if you have a photo variable defined
        // photoURL: photo,
      });
      await sendEmailVerification(auth.currentUser!);
      toast.success("Registration successful! Please verify your email.");
      navigate("/login");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        return toast.error("User already exists!");
      }
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center uppercase text-primary">
          Register
        </h2>
        <form onSubmit={handleEmailPassRegister}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              <FaUser className="inline-block mr-2" /> Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              <FaUser className="inline-block mr-2" /> Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="john_doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              <MdEmail className="inline-block mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
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
              name="password"
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

          <div className="mb-6 relative">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="confirmPassword"
            >
              <BsFillLockFill className="inline-block mr-2" /> Confirm Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              name="confirmPassword"
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

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="(123) 456-7890"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="123 Gadget Street, City, Country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="company">
              Company Name (if applicable)
            </label>
            <input
              type="text"
              id="company"
              placeholder="GadgetPro Inc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              <input
                type="checkbox"
                name="terms"
                className="mr-2 leading-tight"
              />
              I accept the Terms & Services
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
