'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiCompass, FiBookmark, FiSettings, FiUser, FiLogOut, FiPlus, FiChevronDown, FiChevronRight, FiPackage, FiPaperclip, FiPlayCircle, FiPocket } from "react-icons/fi";
import { useState } from "react";
import { removeToken } from "@/utils/connection";

const Sidebar = ({ isOpen }) => {
    const pathname = usePathname();
    const [expandedMenus, setExpandedMenus] = useState({});

    const toggleMenu = (menuName) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };
    const handleLogout = () => {
        removeToken()
        window.location.href = "/login"
    }
    const navItems = [
        {
            name: "Dashboard",
            icon: <FiHome size={20} />,
            path: "/dashboard",
        },
        {
            name: "Products",
            icon: <FiPackage size={20} />,
            path: "/dashboard/products",
        },
        {
            name: "Category",
            icon: <FiPaperclip size={20} />,
            path: "/dashboard/category",
        },
        {
            name: "Brands",
            icon: <FiPocket size={20} />,
            path: "/dashboard/brands",
        },
        {
            name: "Content",
            icon: <FiCompass size={20} />,
            submenu: [
                { name: "Articles", path: "/content/articles" },
                { name: "Media", path: "/content/media" },
                { name: "Categories", path: "/content/categories" },
            ]
        },
        {
            name: "Collections",
            icon: <FiBookmark size={20} />,
            submenu: [
                { name: "Templates", path: "/collections/templates" },
                { name: "Assets", path: "/collections/assets" },
            ]
        },
        {
            name: "Users",
            icon: <FiUser size={20} />,
            path: "/users",
        },
    ];

    return (
        <div className={`fixed inset-y-0 z-50 flex flex-col w-72 py-8 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isOpen ? 'left-0' : '-left-72'}`}>
            {/* Logo */}
            <div className="flex items-center mb-6 px-5">
                <div className="p-3 rounded-lg bg-blue-600">
                    <FiCompass className="text-white text-xl" />
                </div>
                <h1 className="ml-3 text-2xl font-semibold text-gray-800">
                    Admin<span className="font-light text-gray-500">Pro</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 flex-1 px-5 overflow-y-auto">
                {navItems.map((item) => (
                    <div key={item.name}>
                        {item.path ? (
                            <Link
                                href={item.path}
                                className={`flex items-center px-4 py-3 text-[15px] rounded-lg transition-all duration-200 group ${pathname === item.path
                                    ? "bg-blue-600 text-white font-medium"
                                    : "text-gray-700 hover:bg-gray-100"}`}
                            >
                                <span className={`mr-3 transition-colors ${pathname === item.path
                                    ? "text-white"
                                    : "text-gray-500 group-hover:text-gray-700"}`}>
                                    {item.icon}
                                </span>
                                <span className="tracking-wide">{item.name}</span>
                            </Link>
                        ) : (
                            <div className="transition-all duration-200">
                                <button
                                    onClick={() => toggleMenu(item.name)}
                                    className={`flex items-center cursor-pointer justify-between w-full px-4 py-3 text-[15px] rounded-lg transition-all duration-200 group ${expandedMenus[item.name] ? "bg-gray-00" : "hover:bg-gray-100"}`}
                                >
                                    <div className="flex items-center">
                                        <span className={`mr-3 transition-colors ${expandedMenus[item.name]
                                            ? "text-gray-700"
                                            : "text-gray-500 group-hover:text-gray-700"}`}>
                                            {item.icon}
                                        </span>
                                        <span className="tracking-wide">{item.name}</span>
                                    </div>
                                    {expandedMenus[item.name] ? (
                                        <FiChevronDown size={18} className="text-gray-500 transition-transform duration-200" />
                                    ) : (
                                        <FiChevronRight size={18} className="text-gray-500 transition-transform duration-200" />
                                    )}
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus[item.name] ? "max-h-96" : "max-h-0"}`}>
                                    <div className="ml-10 mt-1 space-y-1 py-1">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.path}
                                                className={`block px-4 py-2.5 text-[14px] rounded-lg transition-all duration-200 ${pathname === subItem.path
                                                    ? "bg-blue-600 text-white font-medium"
                                                    : "text-gray-600 hover:bg-gray-100"}`}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto pt-6 px-5 border-t border-gray-200">
                <Link
                    href="/settings"
                    className={`flex items-center px-4 py-3 text-[15px] rounded-lg transition-all duration-200 group ${pathname === "/settings"
                        ? "bg-blue-600 text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100"}`}
                >
                    <FiSettings
                        size={20}
                        className={`mr-3 transition-colors ${pathname === "/settings"
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-700"}`}
                    />
                    <span className="tracking-wide">Settings</span>
                </Link>

                <button onClick={handleLogout} className="cursor-pointer flex items-center w-full px-4 py-3 text-[15px] text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <FiLogOut size={20} className="mr-3 text-gray-500 transition-colors" />
                    <span className="tracking-wide">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;