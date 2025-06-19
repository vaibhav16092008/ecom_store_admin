"use client";

import { FiSearch, FiBell, FiMessageSquare, FiMenu } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { useSidebar } from "@/context/SidebarContext";

const Navbar = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="bg-white border-b border-gray-200 w-full fixed top-0 z-30">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Left side */}
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 mr-3 text-gray-600 rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                        aria-label="Toggle sidebar"
                    >
                        <FiMenu size={20} />
                    </button>

                    {/* Search Bar - hidden on mobile */}
                    <div className="relative hidden sm:block w-56">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FiSearch className="text-gray-400" size={16} />
                        </div>
                        <input
                            type="text"
                            className="w-full py-2 pl-9 pr-3 text-sm text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative">
                        <FiBell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative">
                        <FiMessageSquare size={18} />
                        <span className="absolute top-1 right-1 flex items-center justify-center w-3 h-3 text-[9px] text-white bg-blue-600 rounded-full">
                            3
                        </span>
                    </button>

                    <div className="flex items-center space-x-2 cursor-pointer group pl-2">
                        <div className="w-8 h-8 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="Profile"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <span className="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-blue-600">
                            Sarah
                        </span>
                        <FaAngleDown className="hidden md:block text-gray-500 group-hover:text-blue-600" size={14} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
