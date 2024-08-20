import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, loading, logOut } = useAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <nav className="w-full flex items-center justify-between px-5 py-3 border-b border-b-gray-300">
      <div
        className="flex items-center gap-2 text-2xl"
        onClick={() => navigate("/")}
      >
        <img src="/laptop.png" alt="" className="w-10" />
        <span className="font-bold text-primary">Gadget World</span>
      </div>
      {user ? (
        <div>
          <img
            onClick={() => setMenuOpen(!menuOpen)}
            src={user?.photoURL}
            alt=""
            className="h-12 object-cover w-12 cursor-pointer"
          />
          {menuOpen && (
            <div className="bg-primary py-5 px-10 rounded-lg absolute z-50 flex items-start flex-col gap-y-5 right-5 top-16 text-white">
              <Link
                to="/"
                className="flex items-center py-2 text-sm text-white capitalize transition-colors duration-300 transform "
              >
                <FiUser />
                <span className="mx-1">Profile</span>
              </Link>
              <Link
                to="/"
                className="flex items-center py-2 text-sm text-white capitalize transition-colors duration-300 transform "
              >
                <FiSettings />
                <span className="mx-1">Settings</span>
              </Link>
              <Link
                to="/"
                onClick={handleLogOut}
                className="flex items-center py-2 text-sm text-white capitalize transition-colors duration-300 transform "
              >
                <FiLogOut />
                <span className="mx-1">Logout</span>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-white px-4 py-2 rounded-md font-medium uppercase cursor-pointer"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
