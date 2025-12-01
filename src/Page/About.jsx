import React from 'react';
import { Link } from 'react-router';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-[95%] mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
            About DailyShopBD
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            DailyShopBD is your trusted online marketplace for quality products at unbeatable prices. 
            We are committed to providing a seamless shopping experience with a wide range of categories.
          </p>
        </div>

        <div className="max-w-4xl mx-auto shadow-2xl p-6 md:p-12 rounded-2xl text-center mb-16 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Our mission is to make online shopping simple, reliable, and enjoyable for everyone. 
            We focus on quality, customer satisfaction, and quick delivery to ensure you have a smooth shopping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col justify-between min-h-[220px]">
            <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-2">Quality Products</h3>
            <p className="text-gray-600 mt-2">We carefully select products that meet the highest standards.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col justify-between min-h-[220px]">
            <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-2">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">Quick and reliable delivery for every order.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col justify-between min-h-[220px]">
            <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-2">Customer Support</h3>
            <p className="text-gray-600 mt-2">We are here 24/7 to help you with your queries.</p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Join DailyShopBD Today!</h2>
          <p className="text-gray-700 mb-6 text-lg md:text-xl leading-relaxed">Experience hassle-free online shopping with amazing deals every day.</p>
          <Link to='/products' className="bg-green-700 text-white px-8 py-3 rounded-2xl font-semibold shadow hover:bg-green-600 transition text-lg md:text-xl">
            Start Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;
