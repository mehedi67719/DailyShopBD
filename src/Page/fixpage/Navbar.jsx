import React, { useContext, useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import Logo from '../../Component/logo/Logo';
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from 'react-router';
import { Authcontext } from '../../Component/Authcomponent/Authcontext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [profileOpen, setProfileOpen] = useState(false);   
  const [mobileMenu, setMobileMenu] = useState(false);

  const { user, logout } = useContext(Authcontext);

  const categoryRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("User Logged Out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <nav className="bg-green-800 shadow-md px-6 py-4 flex justify-between items-center relative z-50">

    
      <div className="flex items-center shadow-lg p-1 rounded-xl">
        <Link to="/"><Logo /></Link>
      </div>

     
      <div className="hidden md:flex gap-8 text-white font-semibold items-center">

        <NavLink to="/" className="hover:text-yellow-300">Home</NavLink>
        <NavLink to="/products" className="hover:text-yellow-300">Products</NavLink>
        <NavLink to="/about" className="hover:text-yellow-300">About</NavLink>

    
        <div className="relative" ref={categoryRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="hover:text-yellow-300 flex items-center gap-1"
          >
            Category <IoIosArrowDown />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-40 bg-white text-green-800 rounded-xl shadow-lg py-2 z-50">
              {["electronics","fashion","books","home","sports","toys","beauty"].map(c => (
                <Link key={c} className="block px-4 py-2 hover:bg-green-100" to={`/category/${c}`}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </Link>
              ))}
            </div>
          )}
        </div>

        <NavLink to="/contact" className="hover:text-yellow-300">Contact Us</NavLink>
        <NavLink to="/area" className="hover:text-yellow-300">Service Area</NavLink>
      </div>

      {user ? (
        <div className="relative" ref={profileRef}>
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            {user.photoURL ? (
              <img 
                className="mr-2 w-[45px] h-[45px] border-black border-2 rounded-full object-cover"
                src={user.photoURL}
                alt="profile"
                onError={(e) => e.target.src = ""}
              />
            ) : (
              <FaUserCircle className="text-4xl text-white mr-2" />
            )}
            <IoIosArrowDown className="text-2xl font-bold text-white"/>
          </div>

          {profileOpen && (
            <div className="absolute right-0 mt-2 bg-white text-green-900 w-40 shadow-lg rounded-xl py-2 z-50">
              <Link className="block px-4 py-2 hover:bg-green-100" to="/profile">Profile</Link>
              <Link className="block px-4 py-2 hover:bg-green-100" to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="block px-4 py-2 hover:bg-green-100 w-full text-left">
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden md:flex gap-4">
          <Link to="/login">
            <button className="bg-white text-green-800 px-5 py-2 font-semibold rounded-xl shadow hover:bg-gray-100">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-yellow-400 text-green-900 px-5 py-2 font-bold rounded-xl shadow hover:bg-yellow-300">
              Register
            </button>
          </Link>
        </div>
      )}

     
      <div className="md:hidden text-white text-3xl" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <FiX /> : <FiMenu />}
      </div>

      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-green-900 text-white flex flex-col py-5 px-6 md:hidden gap-4 shadow-lg">

          <NavLink onClick={() => setMobileMenu(false)} to="/" className="hover:text-yellow-300">Home</NavLink>
          <NavLink onClick={() => setMobileMenu(false)} to="/about" className="hover:text-yellow-300">About</NavLink>

          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)} 
            className="hover:text-yellow-300 text-left"
          >
            Category <IoIosArrowDown className="inline" />
          </button>

          {dropdownOpen && (
            <div className="ml-4 flex flex-col gap-2">
              {["electronics","fashion","books","home","sports","toys","beauty"].map(c => (
                <Link 
                  key={c}
                  onClick={() => setMobileMenu(false)} 
                  className="hover:text-yellow-300"
                  to={`/category/${c}`}
                >
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </Link>
              ))}
            </div>
          )}

          <NavLink onClick={() => setMobileMenu(false)} to="/contact" className="hover:text-yellow-300">
            Contact Us
          </NavLink>

          {!user && (
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login">
                <button className="bg-white text-green-800 px-5 py-2 rounded-xl shadow">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-yellow-400 text-green-900 px-5 py-2 rounded-xl shadow">
                  Register
                </button>
              </Link>
            </div>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
