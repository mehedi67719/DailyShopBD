import React, { useState, useEffect, useRef } from 'react';
import Logo from '../logo/Logo';
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from 'react-router';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import Useauth from '../hook/Useauth';

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, logout } = Useauth();
  const profileRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout().then(() => console.log("Logged out")).catch(console.error);
  };

  return (
    <nav className="w-full bg-green-800 shadow-md relative z-50">
      <div className="max-w-[95%] mx-auto  py-4 flex justify-between items-center">

        <div className="flex items-center shadow-lg p-1 rounded-xl">
          <Link to="/"><Logo /></Link>
        </div>

        <div className="hidden md:flex gap-8 text-white font-semibold items-center">
          <NavLink to="/" className={({ isActive }) => isActive ? "underline text-yellow-300" : "hover:text-yellow-300"}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "underline text-yellow-300" : "hover:text-yellow-300"}>Products</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "underline text-yellow-300" : "hover:text-yellow-300"}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "underline text-yellow-300" : "hover:text-yellow-300"}>Contact Us</NavLink>
          <NavLink to="/area" className={({ isActive }) => isActive ? "underline text-yellow-300" : "hover:text-yellow-300"}>Service Area</NavLink>
          {
            user?(<NavLink to="/cart" className="hover:text-yellow-300 text-2xl flex items-center"><FaShoppingCart /></NavLink>):("")
          }
        </div>

        {user ? (
          <div className="relative" ref={profileRef}>
            <div className="flex items-center cursor-pointer" onClick={() => setProfileOpen(!profileOpen)}>
              {user.photoURL ? (
                <img className="mr-2 w-[45px] h-[45px] border-black border-2 rounded-full object-cover" src={user.photoURL} alt="profile" />
              ) : (
                <FaUserCircle className="text-4xl text-white mr-2" />
              )}
            </div>
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white text-green-900 w-40 shadow-lg rounded-xl py-2 z-50">
                <Link className="block px-4 py-2 hover:bg-green-100" to="/profile">Profile</Link>
                <Link className="block px-4 py-2 hover:bg-green-100" to="/dashboard">Dashboard</Link>
                <Link to='/clintorder' className="block px-4 py-2 hover:bg-green-100">Your orders</Link>
                <Link to='/sellerfrom' className="block px-4 py-2 hover:bg-green-100">Add a Product</Link>
                <Link to='/sellerproducts' className="block px-4 py-2 hover:bg-green-100">Your Products</Link>
                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-green-100 w-full text-left">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex gap-4">
            <Link to="/login">
              <button className="bg-white text-green-800 px-5 py-2 font-semibold rounded-xl shadow">Login</button>
            </Link>
            <Link to="/register">
              <button className="bg-yellow-400 text-green-900 px-5 py-2 font-bold rounded-xl shadow">Register</button>
            </Link>
          </div>
        )}

        <div className="md:hidden text-white text-3xl" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <FiX /> : <FiMenu />}
        </div>

        {mobileMenu && (
          <div className="absolute top-full left-0 w-full bg-green-900 text-white flex flex-col py-5 px-6 md:hidden gap-4 shadow-lg">
            <NavLink onClick={() => setMobileMenu(false)} to="/" className="hover:text-yellow-300">Home</NavLink>
            <NavLink onClick={() => setMobileMenu(false)} to="/products" className="hover:text-yellow-300">Products</NavLink>
            <NavLink onClick={() => setMobileMenu(false)} to="/about" className="hover:text-yellow-300">About</NavLink>
            <NavLink onClick={() => setMobileMenu(false)} to="/contact" className="hover:text-yellow-300">Contact Us</NavLink>
            <NavLink onClick={() => setMobileMenu(false)} to="/cart" className="hover:text-yellow-300 flex items-center gap-2 text-2xl"><FaShoppingCart /></NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
