import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-bgDark px-[10%] flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-800">
      <div className="text-sm font-semibold opacity-70 text-[#a0a0b0]">
        &copy; {new Date().getFullYear()} Thirumalaivasan T. All rights reserved.
      </div>
      <div className="text-sm font-semibold opacity-50 text-[#a0a0b0]">
        Built with React & Tailwind CSS
      </div>
    </footer>
  );
};

export default Footer;
