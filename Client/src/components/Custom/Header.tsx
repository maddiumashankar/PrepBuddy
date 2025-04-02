import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header: React.FC = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useGSAP(() => {
    gsap.from(".boxy", {
      opacity:0,
      duration: 0.5,
      y: 50,
      stagger:0.4,
    });
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const GoogleLoginButton = ({ className = "", variant = "default" }) => (
    <button
      className={`
        relative inline-flex items-center justify-center transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 
        focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none 
        ${
          variant === "default"
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
        }
        ${className}
      `}
    >
      <div className="flex items-center">
        <svg
          className="mr-2 h-5 w-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Login with Google
      </div>
    </button>
  );
  return (
    <>
      {location.pathname === "/" ? (
        <div
          className={`sticky top-0 z-50 w-full transition-all duration-200 ${"bg-white shadow-md"} invert overflow-y-hidden`}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <h1 className="boxy text-2xl font-bold text-black">PrepBuddy</h1>
            </Link>
            <nav className="boxy hidden md:flex space-x-8 items-center">
              <a
                href="#features"
                className=" text-gray-800 hover:text-indigo-600 transition"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-800 hover:text-indigo-600 transition"
              >
                How It Works
              </a>
              <GoogleLoginButton className="boxy px-4 py-2 rounded-lg text-sm font-medium cursor-pointer bg-indigo-600 invert" />
            </nav>
            <div className="md:hidden">
              <GoogleLoginButton className="px-3 py-1.5 text-sm rounded-lg invert bg-indigo-600" />
            </div>
          </div>
        </div>
      ) : (
        <header className="bg-black shadow-md w-full">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center cursor-pointer">
              <span className="text-2xl font-bold">PrepBuddy</span>
            </div>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md transition cursor-pointer"
              >
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center"></div>
                <span>User Name</span>
                <svg
                  className={`h-4 w-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <Link
                      to="/previous-tests"
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      Previous Tests
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      to="/"
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-400"
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
