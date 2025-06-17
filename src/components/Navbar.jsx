'use client';

import { FiSearch, FiBell, FiMessageSquare, FiMenu, FiX } from 'react-icons/fi';
import { FaAngleDown } from 'react-icons/fa';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
    return (
        <header className="fixed top-0 z-40 bg-white border-b border-gray-200 transition-all duration-300"
            style={{ left: isSidebarOpen ? '18rem' : '0', right: 0 }}>
            <div className="flex items-center justify-between h-16 px-5">
                {/* Left side with hamburger menu */}
                <div className="flex items-center">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 mr-3 text-gray-600 cursor-pointer rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    >
                        <FiMenu size={20} />
                    </button>

                    {/* Search Bar */}
                    <div className="relative w-56">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FiSearch className="text-gray-400" size={16} />
                        </div>
                        <input
                            type="text"
                            className="w-full py-2 pl-9 pr-3 text-sm text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                {/* Right Side Icons and Profile */}
                <div className="flex items-center space-x-4">
                    {/* Notification Badge */}
                    <button className="cursor-pointer p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
                        <FiBell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Messages Badge */}
                    <button className="cursor-pointer p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
                        <FiMessageSquare size={18} />
                        <span className="absolute top-1 right-1 flex items-center justify-center w-3 h-3 text-[9px] text-white bg-blue-600 rounded-full">3</span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="flex items-center space-x-2 cursor-pointer group pl-2">
                        <div className="w-8 h-8 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <span className="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">Sarah</span>
                        <FaAngleDown className="hidden md:block text-gray-500 group-hover:text-blue-600 transition-colors duration-200" size={14} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;