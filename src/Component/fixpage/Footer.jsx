import React from 'react';
import Logo from '../logo/Logo';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
   <footer className="bg-green-800 text-white py-12 px-6 mb-0 md:px-20">
      <div className="grid md:grid-cols-4 gap-8">

 
        <div>
          <Logo />
          <p className="text-gray-200 mt-4 text-sm">
            DailyShopBD brings you the best products at amazing prices. Your satisfaction is our priority.
          </p>
        </div>

     
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-300 transition">Home</a></li>
            <li><a href="/about" className="hover:text-yellow-300 transition">About</a></li>
            <li><a href="/category" className="hover:text-yellow-300 transition">Category</a></li>
            <li><a href="/contact" className="hover:text-yellow-300 transition">Contact</a></li>
          </ul>
        </div>

     
        <div>
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>Email: meh67719@gmail.com</li>
            <li>Phone: +880 1747737704</li>
            <li>Address: Jashore, Bangladesh</li>
          </ul>
        </div>

  
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4 text-gray-200">
            <a href="https://www.facebook.com/mehedi.hasana.835189" className="hover:text-yellow-300 transition"><FaFacebookF /></a>
            <a href="https://x.com/" className="hover:text-yellow-300 transition"><FaTwitter /></a>
            <a href="https://www.instagram.com/mehedihassan67710/" className="hover:text-yellow-300 transition"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/mehedihassanjashore/" className="hover:text-yellow-300 transition"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

 
      <div className="mt-12 border-t border-green-700 pt-6 text-center text-gray-300 text-sm">
        © 2025 DailyShopBD. All rights reserved.
      </div>
    </footer>
    );
};

export default Footer;