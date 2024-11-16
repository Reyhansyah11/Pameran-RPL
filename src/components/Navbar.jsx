import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoImage from "../assets/image 5.png"; // ganti dengan path logo Anda

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2 lg:ml-16">
        <img src={LogoImage} alt="Logo" className="w-8 h-8" /> {/* Sesuaikan ukuran */}
        <span className="text-white text-lg font-bold">RPLSMART</span>
      </div>

      {/* Button for mobile menu */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar menu for mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 left-4 text-white focus:outline-none"
        >
          <FaTimes size={24} />
        </button>
        <div className="mt-16 space-y-4 p-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block text-white hover:text-gray-300 ${isActive ? "underline" : ""}`
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/top-project"
            className={({ isActive }) =>
              `block text-white hover:text-gray-300 ${isActive ? "underline" : ""}`
            }
            onClick={toggleMenu}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block text-white hover:text-gray-300 ${isActive ? "underline" : ""}`
            }
            onClick={toggleMenu}
          >
            Login
          </NavLink>
        </div>
      </div>

      {/* Links for desktop */}
      <div className="hidden md:flex md:items-center space-x-4 mr-16">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white mx-4 hover:text-gray-300 ${isActive ? "border-b-2 border-orange-500" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/top-project"
          className={({ isActive }) =>
            `text-white hover:text-gray-300 ${isActive ? "border-b-2 border-orange-500" : ""}`
          }
        >
          Gallery
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `text-white hover:text-gray-300`
          }
        >
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-[1px] ml-12 rounded">
            Log in
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
