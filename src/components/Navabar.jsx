import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-cricketGreen p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-red-800">
          🏏 Cric4GenZ
        </h1>
        <ul className="flex gap-6 font-medium">
          <li className="hover:text-green-200 cursor-pointer">Matches</li>
          <li className="hover:text-green-200 cursor-pointer">Series</li>
          <li className="hover:text-green-200 cursor-pointer">News</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;