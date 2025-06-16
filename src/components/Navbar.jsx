'use client';

import { useState } from 'react';
import { FiSearch, FiBell, FiMessageSquare, FiMenu, FiX } from 'react-icons/fi';
import { FaAngleDown } from 'react-icons/fa';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 transition-all duration-300"
            style={{ left: isSidebarOpen ? '18rem' : '0' }}>
            <div className="flex items-center justify-between h-20 px-6">
                {/* Left side with hamburger menu */}
                <div className="flex items-center">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 mr-4 text-gray-600 rounded-lg bg-indigo-50 cursor-pointer text-indigo-600 transition-colors"
                    >
                        <FiMenu size={24} />
                    </button>

                    {/* Search Bar - only visible when sidebar is closed */}

                    <div className="relative w-64 ml-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full py-2.5 pl-10 pr-4 text-gray-700 bg-indigo-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                            placeholder="Search..."
                        />
                    </div>

                </div>

                {/* Right Side Icons and Profile */}
                <div className="flex items-center space-x-6">
                    {/* Notification Badge - hidden on mobile */}
                    <button className="hidden md:block relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                        <FiBell size={20} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Messages Badge - hidden on mobile */}
                    <button className="hidden md:block relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                        <FiMessageSquare size={20} />
                        <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-indigo-600 rounded-full">3</span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="flex items-center space-x-2 cursor-pointer group">
                        <div className="w-9 h-9 overflow-hidden rounded-full bg-gradient-to-r from-indigo-400 to-purple-500">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <span className="hidden md:inline font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">Sarah</span>
                        <FaAngleDown className="hidden md:block text-gray-500 group-hover:text-indigo-600 transition-colors" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;