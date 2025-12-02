import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-[95%] mx-auto">

        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-16">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-8">Get in Touch</h2>
            <form className="flex flex-col gap-5">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="border text-black border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="border text-black border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
              <textarea 
                placeholder="Your Message" 
                rows="5" 
                className="border text-black border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              ></textarea>
              <button 
                type="submit" 
                className="bg-green-800 text-black text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-green-700 transition text-lg md:text-xl"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-bold text-green-700 mb-2 text-lg md:text-xl">Phone</h3>
              <p className="text-gray-700 text-md md:text-lg">+880 1747737704</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-bold text-green-700 mb-2 text-lg md:text-xl">Email</h3>
              <p className="text-gray-700 text-md md:text-lg">meh67719@gamil.com</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="font-bold text-green-700 mb-2 text-lg md:text-xl">Address</h3>
              <p className="text-gray-700 text-md md:text-lg">Jashore, Khulna, Bangladesh</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
