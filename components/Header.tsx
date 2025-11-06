import React from 'react';
import LogoIcon from './icons/LogoIcon';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center bg-white py-6">
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="flex items-center space-x-3 no-underline"
      >
        {/* Logo */}
        <LogoIcon className="h-12 w-auto" />

        {/* Text Section */}
        <div className="flex flex-col leading-tight">
          <h1 className="text-2xl font-bold text-gray-800">
            Abacus <span className="text-green-600">Learning</span>
          </h1>
          <p className="text-sm text-gray-500 -mt-1">By Career Ready J&amp;K</p>
        </div>
      </a>
    </header>
  );
};

export default Header;
