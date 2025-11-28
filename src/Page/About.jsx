import React from 'react';
import { Link } from 'react-router';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 md:px-20">
 
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-green-800 mb-4">
          About DailyShopBD
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg">
          DailyShopBD is your trusted online marketplace for quality products at unbeatable prices. 
          We are committed to providing a seamless shopping experience with a wide range of categories.
        </p>
      </div>


      <div className=" max-w-[800px] mx-auto shadow-2xl p-2 rounded-xl text-center mb-12">
     
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            Our mission is to make online shopping simple, reliable, and enjoyable for everyone. 
            We focus on quality, customer satisfaction, and quick delivery to ensure you have a smooth shopping experience.
          </p>
        </div>
      </div>

  
      <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">Quality Products</h3>
          <p className="text-gray-600">We carefully select products that meet the highest standards.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Quick and reliable delivery for every order.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">Customer Support</h3>
          <p className="text-gray-600">We are here 24/7 to help you with your queries.</p>
        </div>
      </div>

    
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Join DailyShopBD Today!</h2>
        <p className="text-gray-700 mb-6">Experience hassle-free online shopping with amazing deals every day.</p>
        <Link to='/products' className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-600 transition">
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default About;
