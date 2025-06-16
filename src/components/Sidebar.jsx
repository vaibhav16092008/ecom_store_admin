'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiCompass, FiBookmark, FiSettings, FiUser, FiLogOut, FiPlus } from "react-icons/fi";

const Sidebar = ({ isOpen }) => {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", icon: <FiHome size={22} />, path: "/" },
        { name: "Discover", icon: <FiCompass size={22} />, path: "/discover" },
        { name: "Collections", icon: <FiBookmark size={22} />, path: "/collections" },
        { name: "Profile", icon: <FiUser size={22} />, path: "/profile" },
    ];

    return (
        <div className={`fixed inset-y-0 z-50 flex flex-col w-72 px-6 py-8 bg-gradient-to-b from-indigo-50 to-white border-r border-gray-100 transition-all duration-300 ${isOpen ? 'left-0' : '-left-72'}`}>
            {/* Logo with attractive design */}
            <div className="flex items-center justify-start mb-12">
                <div className="p-3 rounded-xl bg-indigo-600 shadow-lg">
                    <FiCompass className="text-white text-2xl" />
                </div>
                <h1 className="ml-4 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Admin
                </h1>
            </div>

            {/* Create button with nice shadow */}
            <button className="flex items-center justify-center mb-8 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:shadow-xl">
                <FiPlus className="mr-2" size={18} />
                <span className="font-semibold">Create New</span>
            </button>

            {/* Navigation with improved styling */}
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`flex items-center px-6 py-4 text-gray-700 transition-all duration-300 rounded-xl hover:bg-white hover:shadow-md ${pathname === item.path
                            ? "bg-white shadow-md font-medium text-indigo-600"
                            : "font-normal"
                            }`}
                    >
                        <span className={`mr-4 ${pathname === item.path ? "text-indigo-600" : "text-gray-500"}`}>
                            {item.icon}
                        </span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            {/* Spacer to push bottom content down */}
            <div className="flex-grow"></div>

            {/* Bottom section with improved styling */}
            <div className="mt-6">
                <Link
                    href="/settings"
                    className={`flex items-center px-6 py-4 text-gray-700 transition-all duration-300 rounded-xl hover:bg-white hover:shadow-md ${pathname === "/settings"
                        ? "bg-white shadow-md font-medium text-indigo-600"
                        : "font-normal"
                        }`}
                >
                    <FiSettings
                        size={22}
                        className={`mr-4 ${pathname === "/settings" ? "text-indigo-600" : "text-gray-500"}`}
                    />
                    <span>Settings</span>
                </Link>

                <button className="flex items-center w-full px-6 py-4 mt-2 text-gray-700 transition-all duration-300 rounded-xl hover:bg-gray-100">
                    <FiLogOut size={22} className="mr-4 text-gray-500" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;