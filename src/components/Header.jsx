import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth, storage } from "../firebase";
const Header = () => {
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
    if (currentUser) {
      console.log("User is signed in: ", currentUser);
    }
    router.push("/login")
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

//get current user from auth context




  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <span className="font-semibold text-xl tracking-tight">My App</span>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          {currentUser && (
            <button
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
              onClick={handleLogout}
             
            >
              Sign Out
            </button>
          )}
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
