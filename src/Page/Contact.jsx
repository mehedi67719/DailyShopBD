import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6 md:px-20">

 
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-12">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">


        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Get in Touch</h2>
          <form className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <textarea 
              placeholder="Your Message" 
              rows="5" 
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            ></textarea>
            <button 
              type="submit" 
              className="bg-green-800 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

       
        <div className="flex flex-col justify-center gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-green-700 mb-2">Phone</h3>
            <p className="text-gray-700">+880 1747737704</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-green-700 mb-2">Email</h3>
            <p className="text-gray-700">meh67719@gamil.com</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-green-700 mb-2">Address</h3>
            <p className="text-gray-700">Jashore, Khulna, Bangladesh</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Contact;
