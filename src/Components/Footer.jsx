// ChatbotScreen/Footer.js
import React from 'react';
import MAI_Logo from '../assets/MAI_Logo.png';

const Footer = ({ isDark }) => {
  return (
    <footer className={`px-6 py-3 text-center transition-all duration-300 ${
      isDark ? 'text-gray-500 bg-gray-800 border-t border-gray-700' : 'text-gray-400 bg-white border-t border-gray-200'
    }`}>
      <p className="flex items-center justify-center gap-2 text-xs font-georamalight">
        <span>Powered by</span>
        <span className={`font-semibold ${isDark ? 'text-red-400' : 'text-red-500'}`}>
          <img src={MAI_Logo} alt="" className='w-6'/>
        </span>
      </p>
    </footer>
  );
};

export default Footer;