import React from 'react';


const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-[#2e2e2e]">

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <img src='https://i.imgur.com/mn9fSNE.png' className="h-8 w-8 text-[#f9f9f9]" />
                <span className="ml-2 text-xl font-bold text-black tracking-wider">RIOT</span>

              </div>
            </div>
            <div className="hidden md:flex space-x-1">
  <a href="#" className="text-[#555555] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200">NEWS</a>
  <a href="#" className="text-[#555555] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200">ESPORTS</a>
  <a href="#" className="text-black px-3 py-2 text-sm font-medium">REDEEM</a>
  <a href="#" className="text-[#555555] hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200">MERCH</a>
</div>

          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-[#d13639] hover:bg-[#ef4444] text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
              TUJETTDECONFI
            </button>
          </div>
          <div className="flex md:hidden">
            <button className="text-[#7e7e7e] hover:text-[#f9f9f9]">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;