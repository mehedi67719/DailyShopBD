import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none cursor-pointer">

      
      <div className="bg-white p-2 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.2)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          className="w-8 h-8 stroke-emerald-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 7V6a6 6 0 0112 0v1M4 8h16l-1.5 11.5A2 2 0 0116.5 22H7.5a2 2 0 01-1.99-2.5L4 8z"
          />
        </svg>
      </div>

     
      <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">
        DailyShopBD
      </h2>
    </div>
  );
};

export default Logo;
